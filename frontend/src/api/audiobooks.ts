import axios from "axios";

const API_URL = "http://localhost:8000";

export const getAudiobooks = async () => {
    const response = await axios.get(`${API_URL}/audiobooks/`);
    return response.data;
};

export const getAudiobookDetails = async (id: number) => {
    const response = await axios.get(`${API_URL}/audiobooks/${id}`);
    return response.data;
};

export const submitReview = async (audiobookId: number, review: { rating: number; review_text: string }) => {
    const response = await axios.post(`${API_URL}/audiobooks/${audiobookId}/reviews/`, review);
    return response.data;
};
