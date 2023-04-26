from typing import List

from consts import LESSON_COLLECTION_NAME
from db.db_handler import get_db_handler
from entities.lesson import Lesson


def insert_lesson(lesson: Lesson, students_name: list):
    if lesson.name in students_name:
        return get_db_handler()[LESSON_COLLECTION_NAME].insert_one(lesson.dict())
    else:
        return "Name not exist"


def find_all_lessons() -> List:
    list1 = list(get_db_handler()[LESSON_COLLECTION_NAME].find())
    list1.reverse()
    return list1
