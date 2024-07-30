import React from 'react';
import Link from 'next/link';

const BackButton: React.FC = () => {
    return (
        <Link href="/" legacyBehavior>
            <a className="fixed top-20 left-4 bg-transparent text-gray-800 text-lg font-semibold border border-gray-300 rounded-lg px-4 py-2 hover:text-red-500 hover:border-red-500">
                &#8592; Back
            </a>
        </Link>
    );
};

export default BackButton;
