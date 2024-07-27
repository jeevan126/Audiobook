import React from "react";
import AudiobookList from "../components/AudiobookList";

const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Audiobook Library</h1>
            <AudiobookList />
        </div>
    );
};

export default HomePage;
