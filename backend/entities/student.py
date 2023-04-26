from datetime import datetime

from pydantic import BaseModel


class Student(BaseModel):
    name: str
    price: int
    permanent: bool = False
    date_of_beginning: datetime
