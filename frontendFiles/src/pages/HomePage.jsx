import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import BoatTours from '../components/BoatTours';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';

const HomePage = () => {
  const location = useLocation();

  // Handle scroll to section based on hash in URL
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      // Wait for components to render, then scroll to the element
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 300);
    }
  }, [location.hash]);

  return (
    <div className="App">
      <SEO
        title="Home"
        description="Experience the breathtaking beauty of Bhitarkanika with Stay and Sail. We offer exclusive boat tours, comfortable accommodations near the national park, and unforgettable wildlife encounters."
        canonical="https://stayandsailbhitarkanika.in/"
      />
      <Hero />
      <About />
      <BoatTours />
      <Reviews />
      <Contact />
    </div>
  );
};

export default HomePage;

