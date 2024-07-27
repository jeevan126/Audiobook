import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAudiobookDetails, submitReview } from "../api/audiobooks";
import ReviewForm from "./ReviewForm";

const AudiobookDetails: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [audiobook, setAudiobook] = useState<any>(null);

    useEffect(() => {
        if (id) {
            const fetchAudiobook = async () => {
                const data = await getAudiobookDetails(Number(id));
                setAudiobook(data);
            };
            fetchAudiobook();
        }
    }, [id]);

    const handleReviewSubmit = async (review: { rating: number; review_text: string }) => {
        if (id) {
            await submitReview(Number(id), review);
            const updatedAudiobook = await getAudiobookDetails(Number(id));
            setAudiobook(updatedAudiobook);
        }
    };

    if (!audiobook) return <div>Loading...</div>;

    return (
        <div>
            <img src={audiobook.cover_image} alt={audiobook.title} />
            <h1>{audiobook.title}</h1>
            <h2>{audiobook.author}</h2>
            <p>{audiobook.genre}</p>
            <p>{audiobook.description}</p>
            <div>
                <h3>Reviews</h3>
                {audiobook.reviews.map((review: any) => (
                    <div key={review.id}>
                        <p>Rating: {review.rating}</p>
                        <p>{review.review_text}</p>
                    </div>
                ))}
            </div>
            <ReviewForm onSubmit={handleReviewSubmit} />
        </div>
    );
};

export default AudiobookDetails;
