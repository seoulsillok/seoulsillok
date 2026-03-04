import fs from 'node:fs/promises';
import path from 'node:path';

const PROFILE_URL = 'https://www.instagram.com/seoulsillok/';
const OUTPUT_PATH = path.resolve(process.cwd(), 'src/data/instagram-posts.generated.ts');

const fallbackCaption = `풍납동 산책로

1. 태백식당 (점심)
2. 두부부 (베이커리)
3. 인트로 베이커리 (베이커리)
4. 풍납백제 문화공원 (산책)
5. 광나루 한강공원 (산책)
6. 유천냉면 (저녁)

머물 곳 잃은 마음은
정처 없이 계절을 헤매이고
흩어지는 찰나의 순간들을
두 눈 가득히 꾹꾹 눌러 담네

Pungnap-dong Walk Route

1. TaeBaek Restaurant (Lunch)
2. Dobubu (Bakery)
3. Intro Bakery (Bakery)
4. Pungnap Baekje Cultural Park (Walk)
5. Gwangnaru Hangang Park (Walk)
6. Yucheon Naengmyeon (Dinner)

A heart with nowhere to rest
Wanders aimlessly through the seasons
Those scattering, fleeting moments
I fill my eyes, pressing them deep inside

#서울 #풍납동 #풍납동맛집 #풍납동맛집추천 #풍납동카페 #풍납동카페추천 #산책 #산책로 #맛집 #카페 #korea #seoultravel #seoul #Pungnap_dong`;

const fallbackMap = {
  풍납동: {
    title: '풍납동 산책로',
    url: PROFILE_URL,
    caption: fallbackCaption
  }
};

function extractDong(caption) {
  const match = caption.match(/([가-힣A-Za-z0-9]+동)/);
  return match ? match[1] : null;
}

async function fetchInstagramPosts(token, userId) {
  const posts = [];
  let nextUrl = `https://graph.facebook.com/v22.0/${userId}/media?fields=id,caption,permalink,timestamp&limit=100&access_token=${token}`;

  while (nextUrl) {
    const response = await fetch(nextUrl);
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Instagram API request failed (${response.status}): ${text}`);
    }

    const payload = await response.json();
    const items = Array.isArray(payload.data) ? payload.data : [];

    for (const item of items) {
      if (!item.caption || !item.permalink) continue;
      posts.push({
        caption: item.caption,
        permalink: item.permalink,
        timestamp: item.timestamp || ''
      });
    }

    nextUrl = payload?.paging?.next || '';
  }

  return posts;
}

function buildPostMap(posts) {
  const byDong = {};

  for (const post of posts) {
    const dong = extractDong(post.caption);
    if (!dong) continue;
    const title = post.caption.split('\n')[0].trim() || `${dong} 기록`;

    byDong[dong] = {
      title,
      url: post.permalink,
      caption: post.caption.trim(),
      timestamp: post.timestamp
    };
  }

  return byDong;
}

async function writeOutput(map, sourceLabel) {
  const content = `export type InstagramPost = {\n  title: string;\n  url: string;\n  caption: string;\n  timestamp?: string;\n};\n\nexport const INSTAGRAM_PROFILE_URL = ${JSON.stringify(PROFILE_URL)};\n\nexport const INSTAGRAM_POSTS_BY_DONG: Record<string, InstagramPost> = ${JSON.stringify(map, null, 2)};\n\nexport const INSTAGRAM_POST_SOURCE = ${JSON.stringify(sourceLabel)};\nexport const INSTAGRAM_SYNCED_AT = ${JSON.stringify(new Date().toISOString())};\n`;

  await fs.writeFile(OUTPUT_PATH, content, 'utf8');
}

async function main() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_IG_USER_ID;

  if (!token || !userId) {
    await writeOutput(fallbackMap, 'fallback');
    console.log('[sync-instagram-posts] Missing INSTAGRAM_ACCESS_TOKEN or INSTAGRAM_IG_USER_ID. Wrote fallback data.');
    return;
  }

  try {
    const posts = await fetchInstagramPosts(token, userId);
    const map = buildPostMap(posts);
    const merged = { ...fallbackMap, ...map };
    await writeOutput(merged, 'graph-api');
    console.log(`[sync-instagram-posts] Synced ${posts.length} posts, mapped ${Object.keys(map).length} dongs.`);
  } catch (error) {
    await writeOutput(fallbackMap, 'fallback-error');
    console.warn('[sync-instagram-posts] Failed to sync from API. Wrote fallback data.');
    console.warn(String(error));
  }
}

main();
