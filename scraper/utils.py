from pydantic import BaseModel
from typing import Union

from mongo_utils import load_environment_and_connect_client

client = load_environment_and_connect_client()

class Article(BaseModel):
    title: str
    link: str
    pubDate: str
    newsletter: str
    creator: Union[str, None] = None
    description: Union[str, None] = None
    
class RSSURL(BaseModel):
    url: str
    rss: str
    name: str
    description: Union[str, None] = None

class URL(RSSURL):
    title_class: str
    author_class: str
    date_class: str
    description_class: str