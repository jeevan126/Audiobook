import React, { useState } from "react";

interface ReviewFormProps {
    onSubmit: (review: { rating: number; review_text: string }) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
    const [rating, setRating] = useState<number>(0);
    const [reviewText, setReviewText] = useState<string>("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit({ rating, review_text: reviewText });
        setRating(0);
        setReviewText("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Rating:
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    min="0"
                    max="5"
                />
            </label>
            <label>
                Review:
                <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ReviewForm;
