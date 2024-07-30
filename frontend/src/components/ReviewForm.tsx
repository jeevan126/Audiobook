import React, { useState } from 'react';

interface ReviewFormProps {
    onSubmit: (review: { rating: number; review_text: string }) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
    const [rating, setRating] = useState<number>(0);
    const [reviewText, setReviewText] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating > 0) {
            onSubmit({ rating, review_text: reviewText });
            setRating(0);
            setReviewText("");
        }
    };

    const renderStarRating = () => {
        return (
            <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        onClick={() => setRating(star)}
                    >
                        &#9733;
                    </span>
                ))}
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Rating
                </label>
                {renderStarRating()}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Review
                </label>
                <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                />
            </div>
            <div className="flex justify-end">
                <button 
                    type="submit" 
                    className={`bg-red-500 text-white px-4 py-2 rounded-lg shadow-md ${rating === 0 ? 'bg-opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`} 
                    disabled={rating === 0}
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default ReviewForm;
