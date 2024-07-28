export interface AudioBook {
  title: string
  author: string
  genre: string
  cover_image: string
  description: string
  id: number
  avg_rating: number
  reviews: Review[]
  total_reviews: number
}

export interface Review {
  rating: number
  review_text: string
  id: number
  audiobook_id: number
}
