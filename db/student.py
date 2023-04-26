from typing import List

from consts import STUDENT_COLLECTION_NAME
from db.db_handler import get_db_handler
from entities.student import Student


def insert_student(student: Student):
    return get_db_handler()[STUDENT_COLLECTION_NAME].insert_one(student.dict())


def find_all_students() -> List:
    return list(get_db_handler()[STUDENT_COLLECTION_NAME].find())
