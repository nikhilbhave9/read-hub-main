from pymongo import MongoClient
from dotenv import load_dotenv

from pprint import pprint

import os


def load_environment_and_connect_client():
    load_dotenv()
    username = os.getenv("MONGO_USERNAME")
    password = os.getenv("MONGO_PASSWORD")
    # this is the only way to make inter-container mongo communication work apparently
    # instead of '@localhost:27017' use the name of the container instance, which should be this only
    client = MongoClient(f"mongodb://{username}:{password}@read_hub-mongo-1/") 
    # client = MongoClient('mongodb+srv://admin:root@cluster0.s8asufw.mongodb.net/?retryWrites=true&w=majority')
    return client

# this function does two levels of sanitization to
# handle FastAPI's incompetency. First it removes the 
# key '_id' from the object, because FastAPI doesn't
# know how parse a key with underscore, then it 
# stringify's the value of that field because the 
# ObjectId() type is not JSON serializable
def sanitize_mongo_object(obj):
    obj['id'] = str(obj.pop("_id"))
    return obj

# initialize a mongodb atlas connection
def fetch_collection(client, db_name, collection_name):
    db = client[db_name]
    collection = db[collection_name]
    return collection

def find_item_in_collection(collection, query):
    return sanitize_mongo_object(collection.find_one(query)) 

# insert item to mongodb collection
def insert_item_to_collection(collection, item):
    collection.insert_one(item)
    return sanitize_mongo_object(collection.find_one(item)) 
    
# update item in mongodb collection
def update_item_in_collection(collection, query, item):
    collection.update_one(query, {"$set": item}, upsert=True)
    return sanitize_mongo_object(collection.find_one(query)) 