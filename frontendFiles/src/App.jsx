import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage';
import JayanagarBookingPage from './pages/JayanagarBookingPage';
import RegistrationPage from './pages/RegistrationPage';
import JayanagarRegistrationPage from './pages/JayanagarRegistrationPage';

import SuccessPage from './pages/SuccessPage';

import RoomServicePage from './pages/RoomServicePage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/jayanagar-booking" element={<JayanagarBookingPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/jayanagar-registration" element={<JayanagarRegistrationPage />} />

        <Route path="/success" element={<SuccessPage />} />
        <Route path="/room-service" element={<RoomServicePage />} />
      </Routes>
    </Layout>
  );
}

export default App;

