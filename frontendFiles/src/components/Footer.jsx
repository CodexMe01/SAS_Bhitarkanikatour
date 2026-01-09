import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleAnchorNavigation = (path) => {
    navigate(path);
    // Wait for navigation and then scroll to the element
    setTimeout(() => {
      const hash = path.split('#')[1];
      if (hash) {
        const element = document.querySelector(`#${hash}`);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    }, 200);
  };

  return (
    <footer className="bg-bhitarkanika-footer text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-start">
          {/* Logo and Description Card */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <img src="https://res.cloudinary.com/dnp8omvqp/image/upload/v1767851510/SABHlogo_b8mk6m.png" alt="SABH Logo" className="h-16 w-auto mb-3" />
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                Discover the untouched beauty of our wildlife sanctuary through exclusive boat tours.
                Experience nature's magnificent creatures in their natural habitat with our expert guides.
              </p>
            </div>
          </div>

          {/* Quick Links Card */}
          <div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <h4 className="text-base sm:text-lg font-semibold mb-3 text-white font-amaranth">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleNavigation('/')}
                    className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm text-left flex items-center group"
                  >
                    <span className="w-2 h-2 bg-bhitarkanika-green rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('/room-service')}
                    className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm text-left flex items-center group"
                  >
                    <span className="w-2 h-2 bg-bhitarkanika-green rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                    Room Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleAnchorNavigation('/#tours')}
                    className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm text-left flex items-center group"
                  >
                    <span className="w-2 h-2 bg-bhitarkanika-green rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                    Book Now
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleAnchorNavigation('/#contact')}
                    className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm text-left flex items-center group"
                  >
                    <span className="w-2 h-2 bg-bhitarkanika-green rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info Card */}
          <div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <h4 className="text-base sm:text-lg font-semibold mb-3 text-white font-amaranth">Contact Info</h4>
              <ul className="space-y-2 text-gray-300 text-xs sm:text-sm">
                <li className="flex items-start space-x-2">
                  <div className="w-5 h-5 bg-bhitarkanika-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=stayandsailbhitarkanika@gmail.com&su=Boat Tour Inquiry&body=Hello, I am interested in booking a boat tour. Please provide more information."
                    className="break-all text-white hover:text-bhitarkanika-light-green transition-colors cursor-pointer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    stayandsailbhitarkanika@gmail.com
                  </a>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-5 h-5 bg-bhitarkanika-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <a
                    href="tel:+919049303893"
                    className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                  >
                    +91 9049303893
                  </a>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-5 h-5 bg-bhitarkanika-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span>Bhitarkanika Wildlife Sanctuary<br />Odisha, India</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Card */}
          <div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <h4 className="text-base sm:text-lg font-semibold mb-3 text-white font-amaranth">Follow Us</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 group cursor-pointer">
                  <div className="w-6 h-6 bg-bhitarkanika-green rounded-full flex items-center justify-center group-hover:bg-bhitarkanika-light-green transition-colors">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm group-hover:text-white transition-colors">Facebook</span>
                </div>
                <div className="flex items-center space-x-2 group cursor-pointer">
                  <div className="w-6 h-6 bg-bhitarkanika-green rounded-full flex items-center justify-center group-hover:bg-bhitarkanika-light-green transition-colors">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm group-hover:text-white transition-colors">Instagram</span>
                </div>

                <div className="flex items-center space-x-2 group cursor-pointer">
                  <div className="w-6 h-6 bg-bhitarkanika-green rounded-full flex items-center justify-center group-hover:bg-bhitarkanika-light-green transition-colors">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm group-hover:text-white transition-colors">Youtube</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-xs sm:text-sm text-center md:text-left">
            © 2025 WildWater Sanctuary Tours. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end space-x-4 sm:space-x-6 md:space-x-8 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-white text-xs sm:text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white text-xs sm:text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-white text-xs sm:text-sm transition-colors">Cancellation Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

