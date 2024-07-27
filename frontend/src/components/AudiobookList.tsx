"use client"
import React, { useEffect, useState } from "react";
import { getAudiobooks } from "../api/audiobooks";

const AudiobookList: React.FC = () => {
    const [audiobooks, setAudiobooks] = useState([]);

    useEffect(() => {
        const fetchAudiobooks = async () => {
            const data = await getAudiobooks();
            setAudiobooks(data);
        };
        fetchAudiobooks();
    }, []);

    return (
        <div>
            {audiobooks.map((audiobook: any) => (
                <div key={audiobook.id}>
                    <img src={audiobook.cover_image} alt={audiobook.title} />
                    <h2>{audiobook.title}</h2>
                    <p>{audiobook.author}</p>
                </div>
            ))}
        </div>
    );
};

export default AudiobookList;
