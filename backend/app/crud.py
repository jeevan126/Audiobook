from sqlalchemy.orm import Session
from . import models, schemas

def get_audiobooks(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Audiobook).offset(skip).limit(limit).all()

def get_audiobook(db: Session, audiobook_id: int):
    return db.query(models.Audiobook).filter(models.Audiobook.id == audiobook_id).first()

def create_audiobook(db: Session, audiobook: schemas.AudiobookCreate):
    db_audiobook = models.Audiobook(**audiobook.dict())
    db.add(db_audiobook)
    db.commit()
    db.refresh(db_audiobook)
    return db_audiobook

def create_review(db: Session, review: schemas.ReviewCreate, audiobook_id: int):
    db_review = models.Review(**review.dict(), audiobook_id=audiobook_id)
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review
