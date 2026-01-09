import React, { useEffect } from 'react';
import BoatCard from '../components/BoatCard';
import { InfoCard, ServiceCard } from '../components/InfoCard';
import ImportantInfoSection from '../components/ImportantInfoSection';


const ServicesPage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const boatTours = [
    {
      title: "From Khola To Dangmal",
      subtitle: "Sunset Photography Cruise",
      price: "₹3,500",
      titleFont: "Amaranth, sans-serif",
      priceFont: "Amaranth, sans-serif",
      features: [
        "Signature creek ride",
        "Birding along creeks",
        "Closer to the heronry circuit",
        "Shorter hop to Dangmal"
      ],
      bookingLink: "/booking"
    },
    {
      title: "From Jayanagar To Dangmal",
      subtitle: "Sunset Photography Cruise",
      price: "₹4,000",
      titleFont: "Amaranth, sans-serif",
      features: [
        "Signature creek ride",
        "Birding along creeks",
        "Closer to the heronry circuit",
        "Shorter hop to Dangmal"
      ],
      bookingLink: "/jayanagar-booking"
    }
  ];

  return (
    <div className="min-h-screen bg-bhitarkanika-gray">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-bhitarkanika-off-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-bhitarkanika-text mb-6 sm:mb-8 md:mb-10 leading-tight font-amaranth italic">
              Explore Bhitarkanika's Waterways
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0 font-normal" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
              Choose from our expertly crafted boat tour packages designed to showcase the best of Bhitarkanika's incredible biodiversity. Each tour is led by experienced local guides who know the sanctuary's secrets.
            </p>
          </div>

          {/* Boat Tour Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {boatTours.map((tour, index) => (
              <BoatCard
                key={index}
                title={tour.title}
                subtitle={tour.subtitle}
                price={tour.price}
                features={tour.features}
                titleFont={tour.titleFont}
                priceFont={tour.priceFont}
                image={index === 0 ? "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" : index === 1 ? "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" : null}
                bookingLink={tour.bookingLink}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Important Information Section */}
      <ImportantInfoSection />


    </div>
  );
};

export default ServicesPage;

