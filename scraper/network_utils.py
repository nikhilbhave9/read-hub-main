from pymongo import MongoClient
from dotenv import load_dotenv
import os

client = None

def load_environment_and_connect_client():
    global client
    load_dotenv()
    username = os.getenv("MONGO_USERNAME")
    password = os.getenv("MONGO_PASSWORD")
    client = MongoClient(f"mongodb://{username}:{password}@localhost:27017/")
    return client

# initialize a mongodb atlas connection
def fetch_collection(db_name, collection_name):
    global client
    db = client[db_name]
    collection = db[collection_name]
    return collection

def find_item_in_collection(collection, query):
    global client
    return collection.find_one(query)

# insert item to mongodb collection
def insert_item_to_collection(collection, item):
    collection.insert_one(item)
    return collection.find_one(item)
    
# update item in mongodb collection
def update_item_in_collection(collection, query, item):
    collection.update_one(query, {"$set": item}, upsert=True)
    return collection.find_one(query)

def __init__():
    global client
    client = load_environment_and_connect_client()
    
__init__()