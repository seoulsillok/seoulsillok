export type InstagramPost = {
  title: string;
  url: string;
  caption: string;
  timestamp?: string;
};

export const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/seoulsillok/";

export const INSTAGRAM_POSTS_BY_DONG: Record<string, InstagramPost[]> = {};

export const INSTAGRAM_POST_SOURCE = "manual";
