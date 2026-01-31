import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-bhitarkanika-gray">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-bhitarkanika-text mb-6 font-amaranth font-bold">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ready to book your adventure? Contact us today to reserve your spot on one of our amazing boat tours
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-bhitarkanika-text mb-6 font-amaranth text-center">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Email Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 bg-bhitarkanika-green rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-bhitarkanika-text mb-2 text-lg">Email</h4>
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=jagan@stayandsailbhitarkanika.in&su=Boat Tour Inquiry&body=Hello, I am interested in booking a boat tour. Please provide more information."
                        className="text-bhitarkanika-green hover:text-bhitarkanika-light-green transition-colors cursor-pointer text-sm break-all"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        jagan@stayandsailbhitarkanika.in
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 bg-bhitarkanika-green rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-bhitarkanika-text mb-2 text-lg">Phone</h4>
                      <a
                        href="tel:+919178994463"
                        className="text-gray-600 text-sm hover:text-bhitarkanika-green transition-colors cursor-pointer"
                      >
                        +91 9178994463
                      </a>
                    </div>
                  </div>
                </div>

                {/* Location Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 bg-bhitarkanika-green rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-bhitarkanika-text mb-2 text-lg">Location</h4>
                      <p className="text-gray-600 text-sm">Bhitarkanika Wildlife Sanctuary<br />Odisha, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-bhitarkanika-text mb-6 font-amaranth text-center">
                Operating Hours
              </h3>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-10 h-10 bg-bhitarkanika-green rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-bhitarkanika-text text-lg">Morning Tours</h4>
                      <p className="text-gray-600">7:00 AM - 10:30 AM</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-10 h-10 bg-bhitarkanika-green rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-bhitarkanika-text text-lg">Afternoon Tours</h4>
                      <p className="text-gray-600">1:30 PM - 4:30 PM</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-10 h-10 bg-bhitarkanika-green rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-bhitarkanika-text text-lg">Days</h4>
                      <p className="text-gray-600">Monday - Sunday</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

