#!/usr/bin/env python3
"""Save public Instagram embed captions into the manually linked posts."""

import json
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen


POSTS_PATH = Path(__file__).resolve().parents[1] / "src/data/instagram-posts.manual.json"


class CaptionParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.depth = 0
        self.in_username = False
        self.username = ""
        self.parts = []

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag == "div":
            if self.depth:
                self.depth += 1
            elif "Caption" in attributes.get("class", "").split():
                self.depth = 1
        elif self.depth and tag == "a" and "CaptionUsername" in attributes.get("class", "").split():
            self.in_username = True
        elif self.depth and tag == "br":
            self.parts.append("\n")

    def handle_endtag(self, tag):
        if tag == "div" and self.depth:
            self.depth -= 1
        elif tag == "a" and self.in_username:
            self.in_username = False

    def handle_data(self, data):
        if not self.depth:
            return
        if self.in_username:
            self.username += data
        else:
            self.parts.append(data)


def fetch_caption(post_url):
    path = urlparse(post_url).path
    match = re.fullmatch(r"/(p|reel|tv)/([A-Za-z0-9_-]+)/?", path)
    if not match:
        raise ValueError(f"Unsupported Instagram post URL: {post_url}")

    embed_url = f"https://www.instagram.com/{match[1]}/{match[2]}/embed/captioned/"
    request = Request(embed_url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(request, timeout=30) as response:
        parser = CaptionParser()
        parser.feed(response.read().decode("utf-8"))

    if parser.username.strip().lower() != "seoulsillok":
        raise ValueError(f"Expected @seoulsillok caption at {embed_url}")
    caption = re.sub(r"\n{3,}", "\n\n", "".join(parser.parts)).strip()
    if not caption:
        raise ValueError(f"No caption found at {embed_url}")
    return caption


def main():
    posts_by_dong = json.loads(POSTS_PATH.read_text(encoding="utf-8"))
    urls = {
        post["url"]
        for posts in posts_by_dong.values()
        for post in posts
        if not post.get("caption")
    }
    captions = {}
    with ThreadPoolExecutor(max_workers=4) as pool:
        futures = {pool.submit(fetch_caption, url): url for url in urls}
        for future in as_completed(futures):
            url = futures[future]
            try:
                captions[url] = future.result()
                print(f"Imported caption for {url}")
            except Exception as error:
                print(f"Could not import {url}: {error}")

    for posts in posts_by_dong.values():
        for post in posts:
            if not post.get("caption") and post["url"] in captions:
                post["caption"] = captions[post["url"]]

    POSTS_PATH.write_text(json.dumps(posts_by_dong, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Saved {len(captions)} captions to {POSTS_PATH}")


if __name__ == "__main__":
    main()
