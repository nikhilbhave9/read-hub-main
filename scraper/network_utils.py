from pymongo import MongoClient
from dotenv import load_dotenv

def load_environment_and_connect_client():
    global client
    load_dotenv()
    username = os.getenv("MONGO_USERNAME")
    password = os.getenv("MONGO_PASSWORD")
    cluster_address = os.getenv("MONGO_CLUSTER_ADDRESS")
    client = MongoClient(f"mongodb+srv://{username}:{password}@{cluster_address}/test?retryWrites=true&w=majority")

# initialize a mongodb atlas connection
def connect_mongo_db_atlas(db_name, collection_name):
    global client
    db = client[db_name]
    collection = db[collection_name]
    return collection