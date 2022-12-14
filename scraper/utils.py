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
    article_tag: str
    article_class: str
    title_tag: str
    title_class: str
    link_tag: str
    link_class: str
    pubdate_tag: str
    pubdate_class: str
    description_tag: str
    description_class: str
    author_tag: str
    author_class: str
    
class RSSURL(BaseModel):
    url: str
    rss: str
    name: str
    description: Union[str, None] = None

class URL(BaseModel):
    name: str
    url: str
    archive: str
    description: Union[str, None] = None
    html_attributes: Union[HTMLAttributes, None] = None
    
class REDIS_DATA(BaseModel):
    key: str
    value: Union[str, None] = None

MONGO_LOCATION = "local"