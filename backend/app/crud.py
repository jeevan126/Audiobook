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
    update_avg_rating(db, audiobook_id)
    return db_review

def update_avg_rating(db: Session, audiobook_id: int):
    db_audiobook = db.query(models.Audiobook).filter(models.Audiobook.id == audiobook_id).first()
    if db_audiobook:
        reviews = db.query(models.Review).filter(models.Review.audiobook_id == audiobook_id).all()
        if reviews:
            avg_rating = sum(review.rating for review in reviews) / len(reviews)
            db_audiobook.avg_rating = avg_rating
            total_reviews = len(reviews)
            db_audiobook.total_reviews = total_reviews
            db.commit()
            db.refresh(db_audiobook)
    return db_audiobook

def delete_audiobook(db: Session, audiobook_id: int):
    db_audiobook = db.query(models.Audiobook).filter(models.Audiobook.id == audiobook_id).first()
    if db_audiobook:
        db.delete(db_audiobook)
        db.commit()
        return db_audiobook
    return None

def update_audiobook(db: Session, audiobook_id: int, audiobook_update: schemas.AudiobookUpdate):
    db_audiobook = db.query(models.Audiobook).filter(models.Audiobook.id == audiobook_id).first()
    if db_audiobook:
        update_data = audiobook_update.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_audiobook, key, value)
        db.commit()
        db.refresh(db_audiobook)
        return db_audiobook
    return None
