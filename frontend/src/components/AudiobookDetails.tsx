"use client";
import React, { useEffect, useState } from "react";
import { getAudiobookDetails, submitReview } from "../api/audiobooks";
import ReviewForm from "./ReviewForm";
import Modal from "./Modal";
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import Navbar from "./Navbar";
import BackButton from "./BackButton";

const AudiobookDetails: React.FC = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [audiobook, setAudiobook] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            setIsModalOpen(false);
            toast.success("Review submitted successfully!");
        }
    };

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <>
                {[...Array(fullStars)].map((_, i) => (
                    <span key={`full-${i}`}>&#9733;</span>
                ))}
                {halfStar && <span>&#9733;</span>}
                {[...Array(emptyStars)].map((_, i) => (
                    <span key={`empty-${i}`}>&#9734;</span>
                ))}
            </>
        );
    };

    return (
        <>
            <Navbar onSearch={() => {}} />
            <BackButton />
            {!audiobook ? (
                <div className="flex justify-center items-center h-screen">
                    <ClipLoader color="#FF4500" size={50} />
                </div>
            ) : ( 
                <div className="mt-24 pt-16 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                    <div className="flex items-center mb-6">
                        <img
                            src={audiobook.cover_image}
                            alt={audiobook.title}
                            className="w-24 h-24 object-cover rounded-xl mr-4"
                        />
                        <div>
                            <h1 className="text-2xl font-bold">{audiobook.title}</h1>
                            <h2 className="text-lg text-gray-600">{audiobook.author}</h2>
                            <p className="text-sm text-gray-500">{audiobook.genre}</p>
                        </div>
                    </div>
                    <p className="mb-6">{audiobook.description}</p>
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold">Average Rating</h3>
                            <div className="flex items-center">
                                <div className="text-red-500">
                                    {renderStars(audiobook.avg_rating)}
                                </div>
                                <p className="ml-2 text-gray-700">
                                    {audiobook.avg_rating.toFixed(1)}/5 ({audiobook.total_reviews} reviews)
                                </p>
                            </div>
                        </div>
                        <button 
                            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Add Review
                        </button>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Reviews</h3>
                        {audiobook.reviews.map((review: any) => (
                            <div key={review.id} className="mb-4 p-4 border rounded-lg shadow-sm">
                                <div className="flex items-center">
                                    <div className="text-red-500">
                                        {renderStars(review.rating)}
                                    </div>
                                </div>
                                <p>{review.review_text}</p>
                            </div>
                        ))}
                    </div>

                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <h2 className="text-xl font-semibold mb-4">Submit Your Review</h2>
                        <ReviewForm onSubmit={handleReviewSubmit} />
                    </Modal>

                    <ToastContainer position="bottom-right" />
                </div>

            )}
            
        </>
    );
};

export default AudiobookDetails;
