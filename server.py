from datetime import datetime
from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db.db_handler import conn
from db.lesson import insert_lesson, find_all_lessons
from db.student import insert_student, find_all_students
from entities.lesson import Lesson
from entities.student import Student
import numpy as np

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5000",
    "http://127.0.0.1",
    "http://127.0.0.1:5000",
    "http://127.0.0.1:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/students")
def add_student(student: Student):
    insert_student(student)


@app.get("/students")
def get_all_students() -> List[Student]:
    students = find_all_students()
    return students


@app.post("/lessons")
def add_lesson(lesson: Lesson):
    insert_lesson(lesson, find_all_student_name())


@app.get("/lessons")
def get_all_lesson() -> List[Lesson]:
    lessons = find_all_lessons()
    return lessons


@app.get("/lessosn/{datestart}/{dateend}")
def get_sum_date_to_date(dateend: datetime, datestart: datetime):
    count = 0
    for lesson in get_all_lesson():
        if datestart <= lesson["date"] <= dateend:
            count += lesson["payment"]
    return count


@app.get("/lessons_by_name")
def get_lessons_by_name(name: str) -> List:
    list_of_lessons = []
    for lesson in get_all_lesson():
        if lesson["name"] == name:
            lesson["_id"] = str(lesson["_id"])
            list_of_lessons.append(lesson)
    return list(list_of_lessons)


@app.get("/sum_by_name")
def get_sum_by_name(name: str):
    student = get_student_by_name(name)
    if (student == "Not exsist"):
        return "Not exsist"
    count = 0
    for lesson in get_all_lesson():
        if lesson["name"] == name:
            count = count + lesson["payment"]
    return count


@app.get("/moneyEarned")
def get_total_sum():
    lessons = get_all_lesson()
    count = 0
    for lesson in lessons:
        count += lesson["payment"]
    return count


# @app.get("/")
# def get_main_site():
#     x = input("enter")
#     return x


@app.get("/student/{debt}")
def get_debt_by_name(name: str):
    numoflesson = len(get_lessons_by_name(name))
    student = get_student_by_name(name)
    debt = student["price"] * numoflesson - get_sum_by_name(name)
    return debt


@app.get("/sortmintomax")
def get_sort_array_payment():
    students = get_all_students()
    dict_of_sums_names = {}
    list_sums = []
    list_names = []
    for student in students:
        list_sums.append(get_sum_by_name(student["name"]))
        list_names.append(student["name"])
    for name in list_names:
        for sum in list_sums:
            dict_of_sums_names[name] = sum
            list_sums.remove(sum)
            break
    sorted_dict = dict(sorted(dict_of_sums_names.items(), key=lambda x: x[1]))
    return sorted_dict


@app.get("/sortmaxtomin")
def get_sort_reverse_array_payment():
    students = get_all_students()
    dict_of_sums_names = {}
    list_sums = []
    list_names = []
    for student in students:
        list_sums.append(get_sum_by_name(student["name"]))
        list_names.append(student["name"])
    for name in list_names:
        for count in list_sums:
            dict_of_sums_names[name] = count
            list_sums.remove(count)
            break
    sorted_dict = dict(sorted(dict_of_sums_names.items(), key=lambda x: x[1], reverse=True))
    return sorted_dict


@app.get("/sum_debt")
def get_total_debt():
    students = get_all_students()
    count = 0
    for student in students:
        count += get_debt_by_name(student["name"])
    return count


@app.get("/students/{student_name}")
def get_student_by_name(name: str):
    students = conn["PrivateTutor"]["student"].find()
    for student in students:
        if name == student["name"]:
            student["_id"] = str(student["_id"])
            return student
    return "Not exsist"


@app.put("/lessons/{item_id}")
def update_payment_lesson(name: str, payment: int = None, date: datetime = None):
    names = find_all_student_name()
    if name not in names:
        exit(1)

    return 1


def find_all_student_name():
    list_students_names = []
    for student in get_all_students():
        list_students_names.append(student["name"])
    x = unique(list_students_names)
    return list(x)


def unique(list1):
    x = np.array(list1)
    return np.unique(x)
