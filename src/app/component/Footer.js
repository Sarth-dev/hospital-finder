import React from 'react';

function Footer() {
  return (
    <footer className="bg-green-600 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} HealthFinder. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-green-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-green-300 transition">Terms of Service</a>
            <a href="#" className="hover:text-green-300 transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
