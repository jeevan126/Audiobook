import axios from "axios";

const API_URL = "https://audiobook-hz1w79hlg-jeevan126s-projects.vercel.app";

interface Params {
    search ?: string,
    sort_by ?: string,
    genre ?: string
}

export const getAudiobooks = async (params:Params) => {
    const response = await axios.get(`${API_URL}/audiobooks/`, {params});
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
