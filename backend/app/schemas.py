from pydantic import BaseModel
from typing import List, Optional

class ReviewBase(BaseModel):
    rating: float
    review_text: str

class ReviewCreate(ReviewBase):
    pass

class Review(ReviewBase):
    id: int
    audiobook_id: int

    class Config:
        orm_mode = True

class AudiobookBase(BaseModel):
    title: str
    author: str
    genre: str
    cover_image: str
    description: str

class AudiobookCreate(AudiobookBase):
    pass

class Audiobook(AudiobookBase):
    id: int
    avg_rating: float
    reviews: List[Review] = []

    class Config:
        orm_mode = True
