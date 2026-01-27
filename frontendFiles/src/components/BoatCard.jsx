import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BoatCard = ({ title, subtitle, price, features, titleFont, priceFont, image, bookingLink = "/booking" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
    >
      {image && (
        <div className="relative h-64">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
      )}

      <div className="p-6">
        <h3
          className="text-2xl font-bold text-bhitarkanika-text mb-2"
          style={{ fontFamily: titleFont }}
        >
          {title}
        </h3>
        <p className="text-gray-600 mb-4">{subtitle}</p>

        <div className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-bhitarkanika-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div
            className="text-3xl font-bold text-bhitarkanika-green"
            style={{ fontFamily: priceFont }}
          >
            {price}
          </div>
          <Link to={bookingLink} className="btn-primary">
            Book Boat
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BoatCard;

