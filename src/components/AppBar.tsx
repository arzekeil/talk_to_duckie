import React, { useState } from "react";

const AppBar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="bg-blue-500 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="text-xl font-bold">
                    <a href="/">Talk To Teddy</a>
                </div>

                {/* Desktop Navigation */}
                {/* <nav className="hidden md:flex space-x-6">
                    <a
                        href="#"
                        className="hover:text-gray-300 transition-colors"
                    >
                        Home
                    </a>
                    <a
                        href="#"
                        className="hover:text-gray-300 transition-colors"
                    >
                        About
                    </a>
                    <a
                        href="#"
                        className="hover:text-gray-300 transition-colors"
                    >
                        Services
                    </a>
                    <a
                        href="#"
                        className="hover:text-gray-300 transition-colors"
                    >
                        Contact
                    </a>
                </nav> */}

                {/* Mobile Menu Button */}
                {/* <button
                    className="md:hidden text-gray-300 focus:outline-none"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        />
                    </svg>
                </button> */}
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <nav className="md:hidden bg-blue-500">
                    <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-600 transition-colors"
                    >
                        Home
                    </a>
                    <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-600 transition-colors"
                    >
                        About
                    </a>
                    <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-600 transition-colors"
                    >
                        Services
                    </a>
                    <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-600 transition-colors"
                    >
                        Contact
                    </a>
                </nav>
            )}
        </header>
    );
};

export default AppBar;
