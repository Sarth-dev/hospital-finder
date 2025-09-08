"use client";
import Link from 'next/link';
import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 text-2xl font-bold tracking-wide cursor-pointer">
            HealthFinder
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-lg">
            <Link href="/" className="hover:text-green-200 transition">Home</Link>
            <Link href="/hospital" className="hover:text-green-200 transition">Hospitals</Link>
            <Link href="/about" className="hover:text-green-200 transition">About</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-600 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu open/close */}
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-500" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-lg">
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-green-600">Home</a>
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-green-600">Hospitals</a>
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-green-600">About</a>
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-green-600">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
