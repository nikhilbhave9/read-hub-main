import requests

from bs4 import BeautifulSoup
from pprint import pprint
from dateutil.parser import parse as dateutil_parse

from utils import Article, RSSURL, URL
from mongo_utils import MongoUtils
from utils import MONGO_LOCATION

# TODO: make class object for parser
def find_common_prefix_and_suffix(article: dict):
    """Finds common prefixes and suffixes from a dictionary of strings.

    Arguments:
        article: dict -- dictionary of article fields
    Return: 
        prefix: str -- common prefix
        suffix: str -- common suffix
    """

    strings = list()
    for k,v in article.items():
        strings.append(v)
    
    prefix = strings[0]
    for s in strings:
        while not s.startswith(prefix):
            prefix = prefix[:-1]
        if not prefix:
            break
    
    suffix = strings[0]
    for s in strings:
        while not s.endswith(suffix):
            suffix = suffix[1:]
        if not suffix:
            break
    
    return prefix, suffix


def handle_xml_link(newsletter: RSSURL):
    """Downloads RSS feed from link and parses all articles from it.
    
    Keyword arguments:
        newsletter: RSSURL -- newsletter object
    Return: return_description
    """
    
    xml = download_xml(link=newsletter.rss)
    articles = parse_rss(xml)
    
    article_objects = list()
    
    for article in articles:
        pfix, sfix = find_common_prefix_and_suffix(article)
        for k, v in article.items():
            article[k] = v.replace(pfix, '').replace(sfix, '')
            article[k] = v.replace('\n', '').replace('\t', '').replace('\r', '').strip()
        article['newsletter'] = newsletter.url
        article_objects.append(article) 
    
    mongo_client = MongoUtils(location=MONGO_LOCATION)
    
    article_collection = mongo_client.fetch_collection("content", "content")
    
    mongo_client.insert_items_to_collection(article_collection, article_objects)


# download xml from link
def download_xml(link):
    """Download RSS Feed from link"""
    
    try:
        response = requests.get(link)
        if response.status_code == 200:
            return response.text
    except Exception as e:
        print(e)


# parse rss feed
def parse_rss(xml):
    """Parses RSS feed for articles"""
    
    try:
        soup = BeautifulSoup(xml, 'xml')
        items = soup.find_all('item')
        articles = list()
        for item in items:
            article = dict()
            # parse all rss fields from rss feed item
            if item.title: 
                article['title'] = item.title.text
            if item.link and 'http' in item.link.text: 
                article['link'] = item.link.text
            elif item.guid and 'http' in item.guid.text: 
                article['link'] = item.guid.text
            if item.pubDate: 
                article['pubDate'] = dateutil_parse(item.pubDate.text).isoformat()
            elif item.pubdate: 
                article['pubDate'] = dateutil_parse(item.pubdate.text).isoformat()
            if item.description: 
                article['description'] = item.description.text
            if item.creator: 
                article['author'] = item.creator.text
            elif item.author: 
                article['author'] = item.author.text
            articles.append(article)
        return articles
    except Exception as e:
        print(e)


if __name__ == '__main__':
    xml_link = RSSURL(rss='https://aeon.co/feed.rss', name='Aeon', url='https://aeon.co/')
    handle_xml_link(xml_link)