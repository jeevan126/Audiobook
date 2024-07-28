import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import Link from 'next/link';

interface NavbarProps {
    onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = debounce((query: string) => {
        onSearch(query);
    }, 300);

    useEffect(() => {
        handleSearchChange(searchQuery);
    }, [searchQuery]);

    return (
        <nav className="fixed top-0 left-0 w-full bg-red-500 p-4 shadow-md flex justify-between items-center">
            <div className="text-white text-2xl font-bold">
                <Link href="/">
                    AwazFM
                </Link>
            </div>
            <div className="relative">
                <input
                    type="text"
                    className="p-2 rounded-md"
                    placeholder="Search by book or author"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </nav>
    );
};

export default Navbar;
