from fastapi import APIRouter, Depends, HTTPException, Query

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
def read_audiobooks(search: str = Query(None), genre: str = Query(None), sort_by: str = Query(None), db: Session = Depends(get_db)):
    query = db.query(models.Audiobook)

    if search:
        query = query.filter(
            (models.Audiobook.title.ilike(f"%{search}%")) |
            (models.Audiobook.author.ilike(f"%{search}%"))
        )
    
    if genre:
        query = query.filter(models.Audiobook.genre == genre)
    
    if sort_by:
        if sort_by == "rating_asc":
            query = query.order_by(models.Audiobook.avg_rating.asc())
        elif sort_by == "rating_desc":
            query = query.order_by(models.Audiobook.avg_rating.desc())
    
    audiobooks = query.all()
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

@router.delete("/audiobooks/{audiobook_id}", response_model=schemas.Audiobook)
def delete_audiobook(audiobook_id: int, db: Session = Depends(get_db)):
    db_audiobook = crud.delete_audiobook(db, audiobook_id)
    if db_audiobook is None:
        raise HTTPException(status_code=404, detail="Audiobook not found")
    return db_audiobook

@router.put("/audiobooks/{audiobook_id}", response_model=schemas.Audiobook)
def update_audiobook(audiobook_id: int, audiobook: schemas.AudiobookUpdate, db: Session = Depends(get_db)):
    db_audiobook = crud.update_audiobook(db, audiobook_id, audiobook)
    if db_audiobook is None:
        raise HTTPException(status_code=404, detail="Audiobook not found")
    return db_audiobook
