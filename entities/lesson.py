from datetime import datetime
from pydantic import BaseModel


class Lesson(BaseModel):
    name: str
    payment: int
    date: datetime
