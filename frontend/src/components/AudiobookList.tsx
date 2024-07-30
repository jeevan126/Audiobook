"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { ClipLoader } from "react-spinners";
import { AudioBook } from "@/types/Audiobooks";
import { getAudiobooks } from "@/api/audiobooks";
interface AudiobookListProps {
    audiobooks: AudioBook[];
    loading: boolean;
    setAudiobooks: (audiobooks: AudioBook[]) => void;
    setLoading: (loading: boolean) => void;
}

const AudiobookList: React.FC<AudiobookListProps> = ({ audiobooks, loading, setAudiobooks, setLoading }) => {
    const [sortOption, setSortOption] = useState<string>("");
    const [genreFilter, setGenreFilter] = useState<string>("");

    useEffect(() => {
        
        const fetchData = async () => {
            setLoading(true);
            const params = {
                sort_by: sortOption,
                genre: genreFilter,
            };
            const response = await getAudiobooks(params);
            setAudiobooks(response);
            setLoading(false);
        };
        fetchData();
    }, [sortOption, genreFilter, setAudiobooks, setLoading]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#FF4500" size={50} />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Audiobooks</h1>
            <div className="mb-4 flex justify-between items-center">
                <select 
                    className="p-2 border border-gray-300 rounded-md"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="rating_asc">Rating: Low to High</option>
                    <option value="rating_desc">Rating: High to Low</option>
                </select>
                <select 
                    className="p-2 border border-gray-300 rounded-md"
                    value={genreFilter}
                    onChange={(e) => setGenreFilter(e.target.value)}
                >
                    <option value="">Filter by Genre</option>
                    <option value="Personal finance">Personal finance</option>
                    <option value="Self-help">Self-help</option>
                    <option value="Biography">Biography</option>
                </select>
            </div>
            { audiobooks.length === 0 ? (
                <p className="text-center text-gray-500">No results found</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {audiobooks.map((audiobook: any) => (
                        <Link key={audiobook.id} href={`/Audiobooks/?id=${audiobook.id}`}>
                            <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer flex flex-col h-full">
                                <img
                                    src={audiobook.cover_image}
                                    alt={audiobook.title}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                                <div className="flex-grow">
                                    <h2 className="text-xl font-semibold">{audiobook.title}</h2>
                                    <p className="text-gray-600">{audiobook.author}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AudiobookList;
