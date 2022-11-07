import requests

# download xml from link
def download_xml(link):
    try:
        response = requests.get(link)
        if response.status_code == 200:
            return response.text
    except Exception as e:
        print(e)

# parse rss feed
def parse_rss(xml):
    try:
        soup = BeautifulSoup(xml, 'xml')
        items = soup.find_all('item')
        for item in items:
            title = item.title.text
            link = item.link.text
            # parse all rss fields from rss feed item
            description = item.description.text
            author = item.author.text
            pubdate = item.pubdate.text
            print(title, link)
    except Exception as e:
        print(e)
