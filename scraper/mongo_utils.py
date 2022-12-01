from pymongo import MongoClient
from dotenv import load_dotenv

from pprint import pprint

import os

class MongoUtils:
    def __init__(self, location="remote"):
        self.client = self.load_environment_and_connect_client(location)

    def load_environment_and_connect_client(self, location):
        load_dotenv()
        username = os.getenv("MONGO_USERNAME")
        password = os.getenv("MONGO_PASSWORD")
        # this is the only way to make inter-container mongo communication work apparently
        # instead of '@localhost:27017' use the name of the container instance, which should be this only
        if location=="local":
            client = MongoClient(f"mongodb://{username}:{password}@mongo/") 
        elif location=="remote":
            client = MongoClient('mongodb+srv://admin:root@cluster0.s8asufw.mongodb.net/?retryWrites=true&w=majority')
        return client

    # This function does two levels of sanitization to
    # handle FastAPI's incompetency. First it removes the 
    # key '_id' from the object, because FastAPI doesn't
    # know how parse a key with underscore, then it 
    # stringify's the value of that field because the 
    # ObjectId() type is not JSON serializable
    def sanitize_mongo_object(self, obj):
        obj['id'] = str(obj.pop("_id"))
        return obj

    def sanitize_mongo_objects(self, objs):
        return [self.sanitize_mongo_object(obj) for obj in objs]

    # initialize a mongodb atlas connection
    def fetch_collection(self, db_name, collection_name):
        db = self.client[db_name]
        collection = db[collection_name]
        return collection

    def find_item_in_collection(self, collection, query):
        return self.sanitize_mongo_object(collection.find_one(query)) 

    # insert item to mongodb collection
    def insert_item_to_collection(self, collection, item):
        collection.insert_one(item)
        return self.sanitize_mongo_object(collection.find_one(item)) 

    # insert list of items to mongodb collection
    def insert_items_to_collection(self, collection, items):
        collection.insert_many(items)
        return self.sanitize_mongo_objects(collection.find({}))

    # update item in mongodb collection
    def update_item_in_collection(self, collection, query, item):
        collection.update_one(query, {"$set": item}, upsert=True)
        return self.sanitize_mongo_object(collection.find_one(query)) 