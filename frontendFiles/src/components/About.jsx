import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <img
                src="/WhatsApp Image 2025-09-13 at 23.47.29_b35c9502.jpg"
                alt="Boat navigating through Bhitarkanika mangrove forests"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-bhitarkanika-green bg-opacity-20 rounded-2xl"></div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-black mb-6">
              <span className="font-amaranth font-bold">About</span>{' '}
              <span className="font-amaranth font-bold italic">SAS Bhitarkanika</span>
            </h2>
            
            <div className="space-y-4 text-black leading-relaxed">
              <p>
                Bhitarkanika is India's second largest mangrove ecosystem. The sanctuary has 213 species of birds in which the most important are the eight varieties of kingfisher and the migratory birds from Europe and central Asia.
              </p>
              
              <p>
                The sanctuary is home to a variety of wildlife including the endangered saltwater crocodile, Indian Pythons, the endangered water monitor lizard, Chinese Pangolin, Wild Pigs, Otter, Rhesus Monkeys, Sambar, Spotted Deer, Wild Boar and the Fishing Cat.
              </p>
              
              <p>
                Our boat tours offer you the unique opportunity to explore this incredible biodiversity up close, with experienced guides who will help you spot and learn about the diverse wildlife that calls Bhitarkanika home.
              </p>
            </div>

            <motion.a
              href="https://en.wikipedia.org/wiki/Bhitarkanika_National_Park"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline mt-8 inline-block"
            >
              KNOW MORE
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

