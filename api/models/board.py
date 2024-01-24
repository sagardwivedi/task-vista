from typing import Optional

from sqlmodel import Field, SQLModel


class Board(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=10)


class BoardCreate(SQLModel):
    name: str = Field(max_length=10)


class BoardRead(SQLModel):
    id: int
    name: str
