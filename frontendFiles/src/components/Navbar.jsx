import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleSectionClick = (sectionId) => {
    if (location.pathname === '/') {
      // If on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on other pages, navigate to home and then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-sm border-b border-white/20" style={{ backgroundColor: 'rgba(235, 208, 147, 0.55)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-bhitarkanika-text hover:text-bhitarkanika-green transition-colors duration-300"
              onClick={() => {
                if (location.pathname === '/') {
                  window.scrollTo(0, 0);
                }
              }}
            >
              <img src="https://res.cloudinary.com/dnp8omvqp/image/upload/v1767851510/SABHlogo_b8mk6m.png" alt="SABH Logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6 xl:space-x-8">
              <Link
                to="/"
                className={`px-3 py-2 text-sm font-lexend-giga font-medium transition-all duration-300 hover:bg-white/10 rounded-md hover:shadow-sm ${isActive('/') ? 'text-bhitarkanika-green bg-white/10' : 'text-bhitarkanika-text hover:text-bhitarkanika-green'
                  }`}
                onClick={() => {
                  if (location.pathname === '/') {
                    window.scrollTo(0, 0);
                  }
                }}
              >
                Home
              </Link>
              <button
                onClick={() => handleSectionClick('about')}
                className="text-bhitarkanika-text hover:text-bhitarkanika-green px-3 py-2 text-sm font-lexend-giga font-medium transition-all duration-300 hover:bg-white/10 rounded-md hover:shadow-sm"
              >
                About SAS
              </button>
              <Link
                to="/room-service"
                className={`px-3 py-2 text-sm font-lexend-giga font-medium transition-all duration-300 hover:bg-white/10 rounded-md hover:shadow-sm ${isActive('/room-service') ? 'text-bhitarkanika-green bg-white/10' : 'text-bhitarkanika-text hover:text-bhitarkanika-green'
                  }`}
              >
                Room Service
              </Link>
              <button
                onClick={() => handleSectionClick('contact')}
                className="text-bhitarkanika-text hover:text-bhitarkanika-green px-3 py-2 text-sm font-lexend-giga font-medium transition-all duration-300 hover:bg-white/10 rounded-md hover:shadow-sm"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Book Now Button */}
          <div className="hidden lg:block">
            <Link
              to="/services"
              className="bg-gradient-to-r from-bhitarkanika-dark to-gray-800 text-white px-4 sm:px-6 py-2 rounded-2xl text-xs sm:text-sm font-lexend-giga font-medium hover:from-gray-800 hover:to-bhitarkanika-dark transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-black/50 hover:scale-105 active:scale-95"
              onClick={() => window.scrollTo(0, 0)}
            >
              BOOK NOW
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-bhitarkanika-green focus:outline-none focus:text-bhitarkanika-green"
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                to="/"
                className={`block px-3 py-2 text-sm sm:text-base font-lexend-giga font-medium transition-all duration-300 hover:bg-white/10 rounded-md hover:shadow-sm ${isActive('/') ? 'text-bhitarkanika-green bg-white/10' : 'text-bhitarkanika-text hover:text-bhitarkanika-green'
                  }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  if (location.pathname === '/') {
                    window.scrollTo(0, 0);
                  }
                }}
              >
                Home
              </Link>
              <button
                onClick={() => handleSectionClick('about')}
                className="text-bhitarkanika-text hover:text-bhitarkanika-green block px-3 py-2 text-sm sm:text-base font-lexend-giga font-medium transition-all duration-300 hover:bg-white/10 rounded-md hover:shadow-sm w-full text-left"
              >
                About SAS
              </button>
              <Link
                to="/room-service"
                className={`block px-3 py-2 text-sm sm:text-base font-lexend-giga font-medium transition-all duration-300 hover:bg-white/10 rounded-md hover:shadow-sm w-full text-left ${isActive('/room-service') ? 'text-bhitarkanika-green bg-white/10' : 'text-bhitarkanika-text hover:text-bhitarkanika-green'
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Room Service
              </Link>
              <button
                onClick={() => handleSectionClick('contact')}
                className="text-bhitarkanika-text hover:text-bhitarkanika-green block px-3 py-2 text-sm sm:text-base font-lexend-giga font-medium transition-all duration-300 hover:bg-white/10 rounded-md hover:shadow-sm w-full text-left"
              >
                Contact
              </button>
              <Link
                to="/services"
                className="w-full text-left bg-gradient-to-r from-bhitarkanika-dark to-gray-800 text-white px-3 py-2 rounded-2xl text-sm sm:text-base font-lexend-giga font-medium hover:from-gray-800 hover:to-bhitarkanika-dark transition-all duration-300 mt-2 shadow-lg hover:shadow-2xl hover:shadow-black/50 hover:scale-105 active:scale-95"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
                BOOK NOW
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav >
  );
};

export default Navbar;

