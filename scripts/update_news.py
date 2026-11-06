#!/usr/bin/env python3
"""Refresh data/news.json from public Google News RSS feeds (headlines + links only).
Run by the optional daily workflow (see scripts/github-workflow-update-news.yml). Standard library only."""
import json, os, datetime, urllib.request, xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime

FEEDS = {
    "Branding": "https://news.google.com/rss/search?q=branding+strategy&hl=en-US&gl=US&ceid=US:en",
    "Rebrand": "https://news.google.com/rss/search?q=rebrand+new+logo&hl=en-US&gl=US&ceid=US:en",
    "Marketing": "https://news.google.com/rss/search?q=brand+marketing+small+business&hl=en-US&gl=US&ceid=US:en",
    "Design": "https://news.google.com/rss/search?q=brand+identity+design&hl=en-US&gl=US&ceid=US:en",
}
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "news.json")


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "BrandBzNewsBot/1.0 (+https://brand.bz)"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.read()


def main():
    items, seen = [], set()
    for topic, url in FEEDS.items():
        try:
            root = ET.fromstring(fetch(url))
        except Exception as e:
            print("skip", topic, e)
            continue
        for it in root.iter("item"):
            title = (it.findtext("title") or "").strip()
            link = (it.findtext("link") or "").strip()
            src = (it.findtext("source") or "").strip()
            if " - " in title and src and title.endswith(src):
                title = title[: -len(src) - 3].strip()
            key = title.lower()[:80]
            if not title or key in seen:
                continue
            seen.add(key)
            try:
                dt = parsedate_to_datetime(it.findtext("pubDate"))
            except Exception:
                dt = datetime.datetime.now(datetime.timezone.utc)
            items.append({"title": title, "link": link, "source": src, "topic": topic, "ts": dt.timestamp(), "date": dt.strftime("%b %d, %Y")})
    if not items:
        print("no items; keeping existing file")
        return
    items.sort(key=lambda x: x["ts"], reverse=True)
    for i in items:
        i.pop("ts")
    data = {"updated": datetime.datetime.now(datetime.timezone.utc).strftime("%b %d, %Y %H:%M UTC"), "items": items[:60]}
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    print("wrote", len(data["items"]))


if __name__ == "__main__":
    main()
