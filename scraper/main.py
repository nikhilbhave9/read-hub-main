from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel

from network_utils import *

app = FastAPI()

class RSSURL(BaseModel):
    url: str
    name: str
    description: Union[str, None] = None

client = load_environment_and_connect_client()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.post("/new_rss/")
async def add_new_rss(rss: RSSURL):
    global client
    print("Adding new RSS feed")
    collection = fetch_collection(client, "urls", "rss")
    collection.insert_one(rss.dict())
    return collection.find_one({"url": rss.url})