from pydantic import BaseModel
from typing import Union

class Article(BaseModel):
    title: str
    link: str
    newsletter: str
    pubDate: Union[str, None] = None
    author: Union[str, None] = None
    description: Union[str, None] = None
    
class HTMLAttributes(BaseModel):
    title_tag: str
    title_class: str
    
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
    
class REDIS_DATA(BaseModel):
    key: str
    value: Union[str, None] = None

MONGO_LOCATION = "local"