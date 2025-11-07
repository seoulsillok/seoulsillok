import type { APIRoute } from 'astro';

export const prerender = false;

const GRAPH_API_BASE = 'https://graph.facebook.com/v21.0';
const DEFAULT_FIELDS = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,children{media_type,media_url,permalink}';

interface InstagramGraphResponse {
  data?: Array<{
    id: string;
    caption?: string;
    media_type?: string;
    media_url?: string;
    permalink?: string;
    thumbnail_url?: string;
    timestamp?: string;
    children?: {
      data?: Array<{
        id: string;
        media_type?: string;
        media_url?: string;
        permalink?: string;
      }>;
    };
  }>;
  paging?: Record<string, unknown>;
  error?: {
    message?: string;
    type?: string;
    code?: number;
  };
}

interface SimplifiedInstagramPost {
  id: string;
  caption: string;
  mediaUrl: string;
  permalink: string;
  timestamp: string;
  hashtags: string[];
}

type GraphPost = NonNullable<InstagramGraphResponse['data']>[number];

const extractHashtags = (caption?: string) => {
  if (!caption) return [] as string[];
  try {
    const matches = caption.match(/#[\p{L}\p{N}_-]+/gu) || [];
    return matches.map((tag) => tag.replace(/^#/, '').toLowerCase());
  } catch {
    const matches = caption.match(/#[A-Za-z0-9_-]+/g) || [];
    return matches.map((tag) => tag.replace(/^#/, '').toLowerCase());
  }
};

const normalizePost = (post: GraphPost): SimplifiedInstagramPost | null => {
  if (!post) return null;
  const permalink = post.permalink || post.children?.data?.[0]?.permalink || '';
  const mediaUrl = post.media_url || post.thumbnail_url || post.children?.data?.[0]?.media_url || '';
  if (!permalink) return null;

  return {
    id: post.id,
    caption: post.caption || '',
    mediaUrl,
    permalink,
    timestamp: post.timestamp || '',
    hashtags: extractHashtags(post.caption)
  };
};

const jsonResponse = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': status === 200 ? 'public, max-age=300' : 'no-store'
    }
  });

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const limit = url.searchParams.get('limit') ?? '50';
  const accessToken =
    import.meta.env.IG_ACCESS_TOKEN ||
    import.meta.env.INSTAGRAM_ACCESS_TOKEN ||
    import.meta.env.PUBLIC_IG_ACCESS_TOKEN ||
    '';
  const userId =
    import.meta.env.IG_USER_ID ||
    import.meta.env.INSTAGRAM_USER_ID ||
    import.meta.env.PUBLIC_IG_USER_ID ||
    '';

  if (!accessToken || !userId) {
    return jsonResponse({ posts: [], skipped: true, reason: 'missing-instagram-credentials' });
  }

  const apiUrl = new URL(`${GRAPH_API_BASE}/${userId}/media`);
  apiUrl.searchParams.set('access_token', accessToken);
  apiUrl.searchParams.set('fields', DEFAULT_FIELDS);
  apiUrl.searchParams.set('limit', limit);

  try {
    const response = await fetch(apiUrl.toString(), {
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      return jsonResponse(
        {
          posts: [],
          error: 'instagram-request-failed',
          status: response.status
        },
        response.status
      );
    }

    const payload = (await response.json()) as InstagramGraphResponse;
    const posts = Array.isArray(payload.data)
      ? payload.data.map(normalizePost).filter((post): post is SimplifiedInstagramPost => Boolean(post))
      : [];

    return jsonResponse({ posts });
  } catch (error) {
    return jsonResponse(
      {
        posts: [],
        error: 'instagram-request-error',
        message: error instanceof Error ? error.message : 'unknown-error'
      },
      502
    );
  }
};
