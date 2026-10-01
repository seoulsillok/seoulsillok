import fs from 'node:fs/promises';
import path from 'node:path';

const PROFILE_URL = 'https://www.instagram.com/seoulsillok/';
const DATA = path.resolve(process.cwd(), 'src/data');
const OUTPUT_PATH = path.join(DATA, 'instagram-posts.generated.ts');
const MANUAL_PATH = path.join(DATA, 'instagram-posts.manual.json');
const BOUNDARIES_PATH = path.join(DATA, 'seoul-dong-boundaries.geojson');
const CROSSWALK_PATH = path.join(DATA, 'seoul-dong-crosswalk.csv');

const boundaries = JSON.parse(await fs.readFile(BOUNDARIES_PATH, 'utf8'));
const catalog = boundaries.features.map(({ properties }) => ({
  key: `${properties.districtCode}:${properties.dongName}`,
  name: properties.dongName,
  district: properties.districtKo
}));
const validKeys = new Set(catalog.map(({ key }) => key));
const keyByPlace = new Map(catalog.map(({ key, name, district }) => [`${district}:${name}`, key]));
const crosswalk = (await fs.readFile(CROSSWALK_PATH, 'utf8')).trim().split('\n').slice(1);
const aliasTargets = new Map();
for (const row of crosswalk) {
  const [, district, legalDong, pageDong] = row.trim().split(',');
  if (legalDong === pageDong || keyByPlace.has(`${district}:${legalDong}`)) continue;
  const aliasKey = `${district}:${legalDong}`;
  const targets = aliasTargets.get(aliasKey) || new Set();
  targets.add(pageDong);
  aliasTargets.set(aliasKey, targets);
}
const aliases = Array.from(aliasTargets, ([place, targets]) => {
  if (targets.size !== 1) return null;
  const [district, name] = place.split(':');
  const page = Array.from(targets)[0];
  return { key: keyByPlace.get(`${district}:${page}`), name, district };
}).filter(Boolean);

function validPost(post) {
  return post && typeof post.url === 'string' &&
    /^https:\/\/(www\.)?instagram\.com\/(p|reel|tv)\/[A-Za-z0-9_-]+\/?/.test(post.url);
}

async function readManualPosts() {
  const manual = JSON.parse(await fs.readFile(MANUAL_PATH, 'utf8'));
  const result = {};
  for (const [key, posts] of Object.entries(manual)) {
    if (!validKeys.has(key)) throw new Error(`Unknown dong in ${MANUAL_PATH}: ${key}`);
    if (!Array.isArray(posts) || posts.some((post) => !validPost(post))) {
      throw new Error(`Invalid Instagram posts for ${key}`);
    }
    result[key] = posts.map((post) => ({
      title: post.title || key.split(':')[1],
      url: post.url,
      caption: post.caption || '',
      ...(post.timestamp ? { timestamp: post.timestamp } : {})
    }));
  }
  return result;
}

async function fetchInstagramPosts(token) {
  const profileUrl = new URL('https://graph.instagram.com/v26.0/me');
  profileUrl.searchParams.set('fields', 'user_id,username');
  profileUrl.searchParams.set('access_token', token);
  const profileResponse = await fetch(profileUrl);
  if (!profileResponse.ok) throw new Error(`Instagram profile request failed (${profileResponse.status})`);
  const profilePayload = await profileResponse.json();
  const profile = profilePayload.data?.[0] || profilePayload;
  if (profile.username?.toLowerCase() !== 'seoulsillok') {
    throw new Error(`Instagram token belongs to @${profile.username || 'unknown'}, expected @seoulsillok`);
  }
  const userId = profile.user_id || profile.id;
  if (!userId) throw new Error('Instagram profile response has no user ID');
  const posts = [];
  const mediaUrl = new URL(`https://graph.instagram.com/v26.0/${encodeURIComponent(userId)}/media`);
  mediaUrl.searchParams.set('fields', 'id,caption,permalink,timestamp');
  mediaUrl.searchParams.set('limit', '100');
  mediaUrl.searchParams.set('access_token', token);
  let nextUrl = mediaUrl.toString();
  while (nextUrl) {
    const response = await fetch(nextUrl);
    if (!response.ok) throw new Error(`Instagram API request failed (${response.status})`);
    const payload = await response.json();
    for (const item of payload.data || []) {
      if (item.caption && validPost({ url: item.permalink })) posts.push(item);
    }
    nextUrl = payload.paging?.next || '';
  }
  return posts;
}

function matchDong(caption) {
  const firstLine = caption.split('\n').map((line) => line.trim()).find(Boolean) || '';
  const candidates = [...catalog, ...aliases].filter(({ name }) => firstLine.includes(name));
  if (!candidates.length) return null;
  const longest = Math.max(...candidates.map(({ name }) => name.length));
  const matches = candidates.filter(({ name }) => name.length === longest);
  if (matches.length === 1) return matches[0].key;
  const namedDistrict = matches.filter(({ district }) => firstLine.includes(district));
  if (namedDistrict.length === 1) return namedDistrict[0].key;
  // A name such as 신사동 occurs in two districts. Never guess which one.
  return null;
}

function mergePosts(manual, apiPosts) {
  const result = structuredClone(manual);
  for (const post of apiPosts) {
    const key = matchDong(post.caption);
    if (!key) continue;
    const list = result[key] || (result[key] = []);
    if (list.some(({ url }) => url === post.permalink)) continue;
    list.push({
      title: post.caption.split('\n').find((line) => line.trim())?.trim() || key.split(':')[1],
      url: post.permalink,
      caption: post.caption.trim(),
      ...(post.timestamp ? { timestamp: post.timestamp } : {})
    });
  }
  return result;
}

async function writeOutput(map, source) {
  const content = `export type InstagramPost = {\n  title: string;\n  url: string;\n  caption: string;\n  timestamp?: string;\n};\n\nexport const INSTAGRAM_PROFILE_URL = ${JSON.stringify(PROFILE_URL)};\n\nexport const INSTAGRAM_POSTS_BY_DONG: Record<string, InstagramPost[]> = ${JSON.stringify(map, null, 2)};\n\nexport const INSTAGRAM_POST_SOURCE = ${JSON.stringify(source)};\n`;
  await fs.writeFile(OUTPUT_PATH, content, 'utf8');
}

const manual = await readManualPosts();
const token = process.env.INSTAGRAM_ACCESS_TOKEN;
const save = process.argv.includes('--save');
if (save && !token) throw new Error('INSTAGRAM_ACCESS_TOKEN is required with --save');
let apiPosts = [];
let source = 'manual';
if (token) {
  try {
    apiPosts = await fetchInstagramPosts(token);
    source = 'graph-api-and-manual';
  } catch (error) {
    if (save) throw error;
    console.warn(`[sync-instagram-posts] ${String(error)}. Keeping manual links.`);
  }
}
const merged = mergePosts(manual, apiPosts);
if (save) {
  await fs.writeFile(MANUAL_PATH, `${JSON.stringify(merged, null, 2)}\n`, 'utf8');
  console.log(`[sync-instagram-posts] Saved ${Object.keys(merged).length} dong link groups to ${MANUAL_PATH}.`);
}
await writeOutput(merged, source);
console.log(`[sync-instagram-posts] ${apiPosts.length} API posts checked; ${Object.keys(merged).length} dongs have links.`);
