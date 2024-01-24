from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from api.models.board import Board, BoardCreate, BoardRead
from api.routes import get_session


router = APIRouter()


@router.post("/boards", response_model=BoardRead, tags=["board"])
def create_board(*, session: Session = Depends(get_session), board: BoardCreate):
    db_board = Board.model_validate(board)
    session.add(db_board)
    session.commit()
    session.refresh(db_board)
    return db_board


@router.get("/boards", response_model=List[BoardRead], tags=["board"])
def get_boards(session: Session = Depends(get_session)):
    return session.exec(select(Board)).all()


@router.get("/boards/{board_id}", response_model=BoardRead, tags=["board"])
def get_board(*, session: Session = Depends(get_session), board_id: int):
    board = session.get(Board, {"id": board_id})
    if not board:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Board not found")
    return board
