import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FacebookIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

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
              <img src="/footer_logo.png" alt="SABH Logo" className="h-16 w-auto mb-3" />
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
                    Book Boat
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
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=jagan@stayandsailbhitarkanika.in&su=Boat Tour Inquiry&body=Hello, I am interested in booking a boat tour. Please provide more information."
                    className="break-all text-white hover:text-bhitarkanika-light-green transition-colors cursor-pointer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    jagan@stayandsailbhitarkanika.in
                  </a>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-5 h-5 bg-bhitarkanika-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <a
                    href="tel:+919178994463"
                    className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                  >
                    +91 9178994463
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
                <a
                  href="https://www.facebook.com/people/Stay-And-Sail-Bhitarkanika/61585296033481/?ref=pl_edit_xav_ig_profile_page_web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 group cursor-pointer"
                >
                  <div className="w-6 h-6 bg-bhitarkanika-green rounded-full flex items-center justify-center group-hover:bg-bhitarkanika-light-green transition-colors">
                    <FacebookIcon className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm group-hover:text-white transition-colors">Facebook</span>
                </a>

                <a
                  href="https://www.instagram.com/stayandsail_bhitarkanika/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 group cursor-pointer"
                >
                  <div className="w-6 h-6 bg-bhitarkanika-green rounded-full flex items-center justify-center group-hover:bg-bhitarkanika-light-green transition-colors">
                    <InstagramIcon className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm group-hover:text-white transition-colors">Instagram</span>
                </a>

                <a
                  href="https://www.youtube.com/@stayandsailbhitarkanika"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 group cursor-pointer"
                >
                  <div className="w-6 h-6 bg-bhitarkanika-green rounded-full flex items-center justify-center group-hover:bg-bhitarkanika-light-green transition-colors">
                    <YoutubeIcon className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm group-hover:text-white transition-colors">Youtube</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-10 flex justify-center items-center">
          <a
            href="https://paper-monkey-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white text-xs sm:text-sm transition-colors font-medium"
          >
            Created by Paper Money
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

