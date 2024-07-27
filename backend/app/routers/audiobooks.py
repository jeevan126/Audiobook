from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import crud, models, schemas
from ..database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/audiobooks/", response_model=List[schemas.Audiobook])
def read_audiobooks(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    audiobooks = crud.get_audiobooks(db, skip=skip, limit=limit)
    return audiobooks

@router.get("/audiobooks/{audiobook_id}", response_model=schemas.Audiobook)
def read_audiobook(audiobook_id: int, db: Session = Depends(get_db)):
    db_audiobook = crud.get_audiobook(db, audiobook_id=audiobook_id)
    if db_audiobook is None:
        raise HTTPException(status_code=404, detail="Audiobook not found")
    return db_audiobook

@router.post("/audiobooks/", response_model=schemas.Audiobook)
def create_audiobook(audiobook: schemas.AudiobookCreate, db: Session = Depends(get_db)):
    return crud.create_audiobook(db=db, audiobook=audiobook)

@router.post("/audiobooks/{audiobook_id}/reviews/", response_model=schemas.Review)
def create_review(audiobook_id: int, review: schemas.ReviewCreate, db: Session = Depends(get_db)):
    return crud.create_review(db=db, review=review, audiobook_id=audiobook_id)
