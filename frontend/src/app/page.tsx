"use client";
import React from "react";
import AudiobookList from "../components/AudiobookList";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { getAudiobooks } from "../api/audiobooks";
import { AudioBook } from "@/types/Audiobooks";


const HomePage: React.FC = () => {
  const [audiobooks, setAudiobooks] = useState<AudioBook[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = async (query: string) => {
      const data = await getAudiobooks({search : query});
      setAudiobooks(data);
      setLoading(false)
  };

  useEffect(() => {
    handleSearch(""); 
  }, []);

  return (
    <>
    <Navbar onSearch={handleSearch} />
      <div className="pt-16">
      <AudiobookList audiobooks={audiobooks} loading={loading} setAudiobooks={setAudiobooks} setLoading={setLoading} />
      </div>
    </>
  );
};

export default HomePage;
