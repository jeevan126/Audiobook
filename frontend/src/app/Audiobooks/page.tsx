import React from "react";
import AudiobookDetails from "../../components/AudiobookDetails";
import { Suspense } from 'react'


const AudiobookPage: React.FC = () => {
    return (
        <div>
            <Suspense>
                <AudiobookDetails />
            </Suspense>
        </div>
    );
};

export default AudiobookPage;
