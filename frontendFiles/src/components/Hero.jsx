import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/01f6133dfdcfc2bf1b89340f988d808dad7a86c2.jpg')`,
        backgroundPosition: 'center 30%'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Top Contact Info */}
      <div className="absolute top-20 sm:top-24 left-0 right-0 z-20 text-white px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-2 text-center">
          <div className="font-amaranth text-sm sm:text-base md:text-lg font-medium tracking-wide">
            Stay and Sail Bhitarkanika Boat Tour Service
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm md:text-base">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=jagan@stayandsailbhitarkanika.in&su=Boat Tour Inquiry&body=Hello, I am interested in booking a boat tour. Please provide more information."
              className="font-amaranth hover:text-bhitarkanika-light-green transition-colors cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Email: jagan@stayandsailbhitarkanika.in
            </a>
            <span className="hidden sm:inline font-amaranth opacity-60">|</span>
            <a
              href="tel:+919049303893"
              className="font-amaranth hover:text-bhitarkanika-light-green transition-colors cursor-pointer"
            >
              Contact: 9049303893
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto w-full"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-2 text-center w-full"
            style={{
              fontFamily: "'LT Highlight', Arial Black, Helvetica, sans-serif",
              fontSize: 'clamp(18px, 2.5vw, 32px)',
              lineHeight: '1.2',
              fontWeight: 'normal'
            }}
          >
            BOAT TOUR IN
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-2 text-center w-full"
            style={{
              fontFamily: "'LT Highlight', Arial Black, Helvetica, sans-serif",
              fontSize: 'clamp(40px, 8vw, 120px)',
              lineHeight: '0.9',
              fontWeight: '900'
            }}
          >
            BHITARKANIKA
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center w-full"
            style={{
              fontFamily: "'LT Highlight', Arial Black, Helvetica, sans-serif",
              fontSize: 'clamp(24px, 4vw, 60px)',
              lineHeight: '1.0',
              fontWeight: '900'
            }}
          >
            NATIONAL PARK
          </motion.h3>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          ></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

