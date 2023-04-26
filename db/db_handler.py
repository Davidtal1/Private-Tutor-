from pymongo import MongoClient

from consts import DB_NAME, MONGO_HOST, MONGO_PORT

conn = MongoClient(MONGO_HOST, MONGO_PORT)


def get_db_handler():
    return conn[DB_NAME]
