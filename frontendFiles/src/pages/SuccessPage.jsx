import React, { useState, useEffect } from 'react';
import { CheckCircle, Download, Home, ArrowLeft } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const bookingId = searchParams.get('booking_id');

  useEffect(() => {
    if (bookingId) {
      fetchBookingDetails();
    } else {
      setLoading(false);
    }
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      const response = await fetch(`/api/booking/${bookingId}`);
      const data = await response.json();

      if (data.success) {
        setBookingDetails(data.booking);
      }
    } catch (error) {
      console.error('Error fetching booking details:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadTicket = () => {
    if (bookingId) {
      window.open(`/ticket/${bookingId}`, '_blank');
    }
  };

  const goHome = () => {
    navigate('/');
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#f9f9f4] text-[#111111] font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bhitarkanika-green mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f9f9f4] text-[#111111] font-sans">
      <main className="mx-auto max-w-4xl px-3 sm:px-6 py-8 sm:py-10">
        {/* Success Header */}
        <section className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-bhitarkanika-green rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-bhitarkanika-text mb-4 font-amaranth">
            Booking Successful!
          </h1>

          <p className="text-lg text-gray-600 mb-2">
            Your boat trip has been confirmed
          </p>

          {bookingId && (
            <p className="text-sm text-gray-500">
              Booking ID: <span className="font-mono font-semibold">{bookingId}</span>
            </p>
          )}
        </section>

        {/* Booking Details */}
        {bookingDetails && (
          <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm ring-1 ring-black/5 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-bhitarkanika-text mb-6 font-amaranth">
              Booking Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Customer Name</h3>
                <p className="text-gray-900">{bookingDetails.customer_name}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Email</h3>
                <p className="text-gray-900">{bookingDetails.email}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Phone</h3>
                <p className="text-gray-900">{bookingDetails.phone}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Trip Date</h3>
                <p className="text-gray-900">{new Date(bookingDetails.trip_date).toLocaleDateString()}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Trip Time</h3>
                <p className="text-gray-900">{bookingDetails.trip_time}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Route</h3>
                <p className="text-gray-900">{bookingDetails.route}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Number of Persons</h3>
                <p className="text-gray-900">{bookingDetails.persons}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Children Under 3</h3>
                <p className="text-gray-900">{bookingDetails.children_under3}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Total Amount</h3>
                <p className="text-gray-900 font-semibold">₹{bookingDetails.amount / 100}</p>
              </div>
            </div>
          </section>
        )}

        {/* Action Buttons */}
        <section className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          {bookingId && (
            <button
              onClick={downloadTicket}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-bhitarkanika-green px-6 py-3 text-sm font-semibold text-white hover:bg-bhitarkanika-green/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Ticket
            </button>
          )}

          <button
            onClick={goHome}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#111111] bg-white px-6 py-3 text-sm font-medium text-[#111111] hover:bg-black/5 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>

          <button
            onClick={goBack}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </section>

        {/* Additional Info */}
        <section className="mt-12 text-center">
          <div className="bg-bhitarkanika-green/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-bhitarkanika-text mb-2">
              What's Next?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              You will receive a confirmation email shortly. Please arrive at the departure point 15 minutes before your scheduled time.
            </p>
            <p className="text-xs text-gray-500">
              For any queries, please contact us at +91-9049303893
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SuccessPage;
