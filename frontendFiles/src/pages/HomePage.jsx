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
        title="Bhitarkanika Boat Service & Tour Booking | Stay and Sail"
        description="Official Bhitarkanika boat booking service. Book your Khola to Dangmal or Jayanagar to Dangmal boat tour online. Experience the mangrove wildlife with our premium boat service."
        keywords="bhitarkanika boat booking, bhitarkanika boat service, bhitarkanika tour, bhitarkanika national park boat price, dangmal boat booking, khola gate boat, odisha tourism bhitarkanika"
        canonical="https://stayandsailbhitarkanika.in/"
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          "name": "Stay and Sail Bhitarkanika",
          "image": "https://stayandsailbhitarkanika.in/SABHlogo.png",
          "description": "Premium boat tour agency in Bhitarkanika National Park offering online boat booking and guided tours.",
          "url": "https://stayandsailbhitarkanika.in/",
          "telephone": "+919178994463",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bhitarkanika National Park",
            "addressRegion": "Odisha",
            "addressCountry": "IN"
          },
          "priceRange": "₹3500-₹4000",
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "06:00",
              "closes": "18:00"
            }
          ]
        })}
      </script>
      <Hero />
      <About />
      <BoatTours />
      <Reviews />
      <Contact />
    </div>
  );
};

export default HomePage;

