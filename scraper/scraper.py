# Python Libraries
import time

# Selenium Webdriver Init
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

# Selenium Webdriver Support Libraries
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait

from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

# Scraper Utilities
from utils import MONGO_LOCATION, Article
from mongo_utils import MongoUtils


class NewsletterScraper():
    def __init__(self, driver_browser="chrome", debug=True):
        """Initializes:
            1. Selenium Webdriver
            2. MongoDB Connection
            3. Known Attributes
            4. Newsletter URL
        """
        
        if driver_browser == "chrome":
            chr_options = Options()
            
            if not debug:
                chr_options.add_argument('--headless')
            
            self.driver = webdriver.Chrome(
                service=Service(ChromeDriverManager().install()),
                options=chr_options
            )
        
        self.mongo_client = MongoUtils(location=MONGO_LOCATION)
        self.known_attributes = False
        
        self.NO_PUBDATE = False
        self.NO_AUTHOR = False
        self.NO_DESCRIPTION = False

    def load_newsletter_page(self, url, archive_url, known_attributes=None):
        """
        Driver loads newsletter page, and if HTML classnames are 
        provided, sets them as class variables
        """
        
        self.home_url = url
        self.driver.get(archive_url)
        
        if known_attributes:
            self.article_attr     = known_attributes["article"]
            self.title_attr       = known_attributes["title"]
            self.link_attr        = known_attributes["link"]
            self.pubdate_attr     = known_attributes["pubdate"]
            self.description_attr = known_attributes["description"]
            self.author_attr      = known_attributes["author"]
            self.next_page_attr	  = known_attributes["next_page"]
            self.known_attributes = self.check_known_attributes()

        self.autoscroll()
    
    def autoscroll(self, pgdown_num=8):
        """
        Automatically scrolls down a page a specified number of times,
        while waiting for a random amount of time between each scroll.
        (This makes the website think we're a human)
        """
        
        elem = self.driver.find_element(By.TAG_NAME, "body")
        
        for i in range(pgdown_num):
            elem.send_keys(Keys.PAGE_DOWN)
            time.sleep(random.random()%10)
    
    def check_known_attributes(self):
        """
        Checks known attributes supplied by user. Some are required,
        some are optional. If required attributes are missing, the
        process is terminated. Otherwise, the missing optional ones
        are marked as such, and they are skipped during the scraping
        process.
        """
        if not self.article_attr['tag'] and not self.article_attr['class']: 
            return False
        if not self.title_attr['tag'] and not self.title_attr['class']: 
            return False
        if not self.link_attr['tag'] and not self.link_attr['class']: 
            return False
        if not self.pubdate_attr['tag'] and not self.pubdate_attr['class']: 
            self.NO_PUBDATE = True
        if not self.description_attr['tag'] and not self.description_attr['class']: 
            self.NO_DESCRIPTION = True
        if not self.author_attr['tag'] and not self.author_attr['class']: 
            self.NO_AUTHOR = True
        return True
        
    
    def find_all_articles_known(self):
        """If HTML Tags and/or Classnames are known (and previously initialized), 
        this function will find all articles (and metadata) on the page and 
        return them as a list.
        """
        
        articles = list()
        
        self.autoscroll(pgdown_num=2)
        
        if self.article_attr['tag']:
            articles_ = self.driver.find_elements(By.TAG_NAME, self.article_attr['tag'])
        else:
            articles_ = self.driver.find_elements(By.CLASS_NAME, self.article_attr['class'])
        
        self.autoscroll(pgdown_num=2)
        
        for article in articles_:
            if self.title_attr['tag']:
                title_ = article.find_element(By.TAG_NAME, self.title_attr['tag']).text
            else:
                title_ = article.find_element(By.CLASS_NAME, self.title_attr['class']).text
            
            if self.link_attr['tag']:
                link_ = article.find_element(By.TAG_NAME, self.link_attr['tag']).get_attribute("href")
            else:
                link_ = article.find_element(By.CLASS_NAME, self.link_attr['class']).get_attribute("href")
            
            if not self.NO_PUBDATE:
                if self.pubdate_attr['tag']:
                    pubdate_ = article.find_element(By.TAG_NAME, self.pubdate_attr['tag']).text
                else:
                    pubdate_ = article.find_element(By.CLASS_NAME, self.pubdate_attr['class']).text
            else:
                pubdate_ = None
            
            if not self.NO_DESCRIPTION:
                if self.description_attr['tag']:
                    description_ = article.find_element(By.TAG_NAME, self.description_attr['tag']).text
                else: 
                    description_ = article.find_element(By.CLASS_NAME, self.description_attr['class']).text
            else:
                description_ = None
            
            if not self.NO_AUTHOR:
                if self.author_attr['tag']:
                    author_ = article.find_element(By.TAG_NAME, self.author_attr['tag']).text
                else:
                    author_ = article.find_element(By.CLASS_NAME, self.author_attr['class']).text
            else:
                author_ = None
            
            articles.append(Article(title_, link_, self.home_url, pubdate_, author_, description_))
    
        return articles

    def go_to_next_page(self):
        return

    def find_all_articles_unknown(self):
        return
    
    def find_all_articles(self):
        if self.known_attributes:
            self.find_all_articles_known()
        else:
            self.find_all_articles_unknown()