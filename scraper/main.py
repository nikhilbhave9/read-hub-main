from typing import Union
from fastapi import FastAPI

from mongo_utils import MongoUtils
from parser import handle_xml_link
from utils import *

from threading import Thread

app = FastAPI()

mongo_client = MongoUtils(location=MONGO_LOCATION)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/new_rss_url")
async def add_new_rss(rss: RSSURL):
    collection = mongo_client.fetch_collection("urls", "rss")
    xml_parse_thread = Thread(target=handle_xml_link, args=(rss,))
    xml_parse_thread.start()
    return mongo_client.insert_item_to_collection(collection, rss.dict())

@app.post("/new_url")
async def add_new_url(url: URL):
    collection = mongo_client.fetch_collection(client, "urls", "non_rss")
    return mongo_client.insert_item_to_collection(collection, url.dict())