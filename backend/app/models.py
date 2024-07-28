from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Audiobook(Base):
    __tablename__ = "audiobooks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    author = Column(String)
    genre = Column(String)
    cover_image = Column(String)
    description = Column(String)
    avg_rating = Column(Float, default=0.0)
    total_reviews = Column(Integer, default=0)

    reviews = relationship("Review", back_populates="audiobook")

class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    audiobook_id = Column(Integer, ForeignKey("audiobooks.id"))
    rating = Column(Float)
    review_text = Column(String)

    audiobook = relationship("Audiobook", back_populates="reviews")
