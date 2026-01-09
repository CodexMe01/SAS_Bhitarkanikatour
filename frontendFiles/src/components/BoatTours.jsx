import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BoatTours = () => {
  const tours = [
    {
      id: 1,
      title: "From Khola To Dangmal",
      subtitle: "Sunset Photography Cruise",
      price: "₹3,500",
      duration: "3.5 Hours",
      features: [
        "Signature creek ride",
        "Birding along creeks",
        "Closer to the heronry circuit",
        "Shorter hop to Dangmal"
      ],
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bookingLink: "/booking"
    },
    {
      id: 2,
      title: "From Jayanagar To Dangmal",
      subtitle: "Sunset Photography Cruise",
      price: "₹4,000",
      duration: "3.5 Hours",
      features: [
        "Signature creek ride",
        "Birding along creeks",
        "Closer to the heronry circuit",
        "Shorter hop to Dangmal"
      ],
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bookingLink: "/jayanagar-booking"
    }
  ];

  return (
    <section id="tours" className="section-padding bg-bhitarkanika-gray">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-bhitarkanika-text mb-6 font-amaranth font-bold">
            Explore Bhitarkanika's Waterways
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience the beauty of Bhitarkanika with our expertly crafted boat tour packages
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-bhitarkanika-text mb-2 font-amaranth">
                  {tour.title}
                </h3>
                <p className="text-gray-600 mb-4">{tour.subtitle}</p>

                <div className="space-y-3 mb-6">
                  {tour.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-bhitarkanika-green" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-black font-amaranth">
                    {tour.price}
                  </div>
                  <Link
                    to={tour.bookingLink}
                    className="btn-primary"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'instant' });
                      setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 50);
                    }}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoatTours;

