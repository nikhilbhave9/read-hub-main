from typing import Union
from fastapi import FastAPI

from mongo_utils import MongoUtils
from parser import handle_xml_link
from scraper import NewsletterScraper
from apscheduler.schedulers.background import BackgroundScheduler

from utils import *

import redis
from pprint import pprint

from threading import Thread

app = FastAPI()

mongo_client = MongoUtils(location=MONGO_LOCATION)

rd = redis.Redis(host='cache', port=5050, db=0, password='foobared')



def daily_parse_and_scrape():
    rss_url = mongo_client.fetch_collection("rss_urls", "rss_urls")
    url = mongo_client.fetch_collection("urls", "urls")
    
    for rss in mongo_client.find_item_in_collection(rss_url, None):
        print(rss)
        handle_xml_link(rss)
    for u in mongo_client.find_item_in_collection(url, None):
        print(u)
        handle_scraping(u)

scheduler = BackgroundScheduler()
scheduler.add_job(func=daily_parse_and_scrape, trigger="interval", days=1)
scheduler.start()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/new_rss_url")
async def add_new_rss(rss: RSSURL):
    collection = mongo_client.fetch_collection("rss_urls", "rss_urls")
    xml_parse_thread = Thread(target=handle_xml_link, args=(rss,))
    xml_parse_thread.start()
    return mongo_client.insert_item_to_collection(collection, rss.dict())


def handle_scraping(scrapeUrl: URL):
    scraper = NewsletterScraper(debug=False)
    scraper.load_newsletter_page(url=scrapeUrl.url, archive_url=scrapeUrl.archive, known_attributes=scrapeUrl.html_attributes)
    scraper.find_all_articles()

@app.post("/new_scrape_url")
async def add_new_url(url: URL):
    collection = mongo_client.fetch_collection("urls", "urls")
    scrape_thread = Thread(target=handle_scraping, args=(url))
    scrape_thread.start()
    return mongo_client.insert_item_to_collection(collection, url.dict())

@app.post("/redisSet")
async def redis_set_method(redis_data: REDIS_DATA):
    pprint(redis_data.dict())
    rd.set(redis_data.key, redis_data.value)
    return {"key": redis_data.key, "value": redis_data.value}

@app.get("/redisGet")
async def redis_get_method(redis_data: REDIS_DATA):
    pprint(redis_data.dict())
    return rd.get(redis_data.key)