from typing import Union
from fastapi import FastAPI

from mongo_utils import MongoUtils
from parser import handle_xml_link
from scraper import NewsletterScraper
from utils import *

import redis
from pprint import pprint

from threading import Thread

app = FastAPI()

mongo_client = MongoUtils(location=MONGO_LOCATION)

rd = redis.Redis(host='cache', port=6379, db=0, password='foobared')

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/new_rss_url")
async def add_new_rss(rss: RSSURL):
    collection = mongo_client.fetch_collection("rss_urls", "rss_urls")
    xml_parse_thread = Thread(target=handle_xml_link, args=(rss,))
    xml_parse_thread.start()
    return mongo_client.insert_item_to_collection(collection, rss.dict())

@app.post("/new_url")
async def add_new_url(url: URL):
    collection = mongo_client.fetch_collection("urls", "urls")
    scrape_thread = Thread(target=NewsletterScraper())
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