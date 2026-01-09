import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Upload, Cloud } from "lucide-react";

const ID_PROOF_OPTIONS = [
  "Aadhaar Card",
  "PAN Card",
  "Voter ID Card",
  "Driving License",
  "Passport",
  "Other Government ID"
];

export default function JayanagarRegistrationPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    idProofType1: "",
    idProofFile: null
  });

  const [isDragOver, setIsDragOver] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (file) => {
    setFormData(prev => ({
      ...prev,
      idProofFile: file
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName) return alert("Please enter your full name.");
    if (!formData.phone) return alert("Please enter your phone number.");
    if (!formData.email) return alert("Please enter your email address.");
    if (!formData.address) return alert("Please enter your address.");
    if (!formData.idProofType1) return alert("Please select your ID proof type.");
    if (!formData.idProofFile) return alert("Please upload your ID proof.");

    // Get booking data from sessionStorage
    const bookingData = JSON.parse(sessionStorage.getItem('bookingData') || '{}');

    // Prepare form data for submission
    const submitData = new FormData();
    submitData.append('name', formData.fullName);
    submitData.append('phone', formData.phone);
    submitData.append('email', formData.email);
    submitData.append('address', formData.address);
    submitData.append('id_type', formData.idProofType1);
    submitData.append('id_file', formData.idProofFile);

    // Add booking data
    // Use local date to avoid off-by-one errors
    let dateStr = '';
    if (bookingData.date) {
      const d = new Date(bookingData.date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      dateStr = `${year}-${month}-${day}`;
    }
    submitData.append('date', dateStr);
    submitData.append('time', bookingData.slot === "First Shift (7:00 am - 10:00 am)" ? "07:00" : "13:30");
    submitData.append('route', bookingData.route || 'From Jayanagar To Dangmal');
    submitData.append('persons', bookingData.guests || 1);
    submitData.append('children_under3', bookingData.children || 0);

    try {
      const response = await fetch('/pay', {
        method: 'POST',
        body: submitData
      });

      if (response.ok) {
        const html = await response.text();
        // Create a new window/tab for payment
        const paymentWindow = window.open('', '_blank');
        paymentWindow.document.write(html);
        paymentWindow.document.close();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Payment processing failed'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while processing your request. Please try again.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f9f9f4] text-[#111111] font-sans">
      <main className="mx-auto max-w-4xl px-3 sm:px-6 py-8 sm:py-10">
        {/* Header */}
        <section className="mb-8 sm:mb-12">
          <div className="flex flex-col items-center text-center">
            <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-amaranth font-bold text-bhitarkanika-text tracking-wide">
              From Jayanagar To Dangmal
            </h1>
            <p className="mb-6 text-sm sm:text-base text-gray-600 max-w-2xl">
              Sunset Photography Cruise • Signature Creek Ride
            </p>
            <div className="relative w-full max-w-2xl sm:max-w-3xl">
              {/* Decorative curved path */}
              <div className="relative mb-4">
                <svg viewBox="0 0 500 100" className="w-full h-14 sm:h-16 text-bhitarkanika-olive" preserveAspectRatio="none">
                  {/* Main curved path - more pronounced curve with dotted line */}
                  <path
                    d="M50,50 Q150,10 250,50 T450,50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="8 6"
                    className="drop-shadow-sm"
                  />
                  {/* Decorative dots along the path */}
                  <circle cx="100" cy="35" r="2" fill="currentColor" className="animate-pulse" />
                  <circle cx="200" cy="15" r="1.5" fill="currentColor" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <circle cx="300" cy="35" r="1.5" fill="currentColor" className="animate-pulse" style={{ animationDelay: '1s' }} />
                  <circle cx="400" cy="45" r="2" fill="currentColor" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
                </svg>

                {/* Start and End points with icons closer to text */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                  <div className="w-3 h-3 bg-bhitarkanika-green rounded-full shadow-md border border-white"></div>
                  <span className="text-xs font-semibold text-bhitarkanika-text bg-white px-2 py-0.5 rounded-full shadow-sm">Jayanagar</span>
                  <div className="w-6 h-6 bg-bhitarkanika-beige rounded-full flex items-center justify-center shadow-sm ml-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                </div>

                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                  <div className="w-6 h-6 bg-bhitarkanika-beige rounded-full flex items-center justify-center shadow-sm mr-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-bhitarkanika-text bg-white px-2 py-0.5 rounded-full shadow-sm">Dangmal</span>
                  <div className="w-3 h-3 bg-bhitarkanika-green rounded-full shadow-md border border-white"></div>
                </div>
              </div>

              {/* Decorative bouncing dots */}
              <div className="flex items-center justify-center text-bhitarkanika-olive">
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-bhitarkanika-olive rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-bhitarkanika-olive rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1.5 h-1.5 bg-bhitarkanika-olive rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Details Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm ring-1 ring-black/5">
            <h2 className="text-xl sm:text-2xl font-bold text-bhitarkanika-text mb-6 font-amaranth">
              Personal Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your Full Name"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-bhitarkanika-green focus:border-transparent"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone No.
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your Phone Number"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-bhitarkanika-green focus:border-transparent"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your Email ID"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-bhitarkanika-green focus:border-transparent"
                  required
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your complete address"
                  rows={3}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-bhitarkanika-green focus:border-transparent resize-none"
                  required
                />
              </div>

              {/* ID Proof Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select ID Proof
                </label>
                <select
                  name="idProofType1"
                  value={formData.idProofType1}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-bhitarkanika-green focus:border-transparent"
                  required
                >
                  <option value="">Select Your ID Proof Type</option>
                  {ID_PROOF_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="bg-bhitarkanika-green/5 rounded-2xl p-6 sm:p-8 shadow-sm ring-1 ring-bhitarkanika-green/20">
            <h2 className="text-xl sm:text-2xl font-bold text-bhitarkanika-text mb-6 font-amaranth">
              Booking Summary
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-bhitarkanika-green/20">
                <div>
                  <p className="text-sm font-semibold text-bhitarkanika-text">Route</p>
                  <p className="text-xs text-gray-600">From Jayanagar To Dangmal</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-bhitarkanika-text">₹4,000</p>
                  <p className="text-xs text-gray-600">Per boat (up to 18 people)</p>
                </div>
              </div>

              <div className="bg-white/50 rounded-lg p-3">
                <p className="text-xs text-gray-600 text-center">
                  <strong>Note:</strong> This is a per-boat booking. The price covers the entire boat for up to 18 people (excluding children under 3 years old).
                </p>
              </div>
            </div>
          </div>

          {/* Upload ID Proof Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm ring-1 ring-black/5">
            <h2 className="text-xl sm:text-2xl font-bold text-bhitarkanika-text mb-6 font-amaranth">
              Upload ID Proof
            </h2>

            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${isDragOver
                  ? 'border-bhitarkanika-green bg-bhitarkanika-green/5'
                  : 'border-gray-300 hover:border-bhitarkanika-green/50'
                }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="idProofFile"
                accept="image/*,.pdf"
                onChange={handleFileInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-bhitarkanika-green/10 rounded-full flex items-center justify-center">
                  <Cloud className="w-8 h-8 text-bhitarkanika-green" />
                </div>

                <div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-bhitarkanika-green text-white rounded-xl font-semibold hover:bg-bhitarkanika-green/90 transition-colors"
                    onClick={() => document.getElementById('idProofFile').click()}
                  >
                    <Upload className="w-4 h-4" />
                    Upload File
                  </button>
                </div>

                <p className="text-sm text-gray-600">
                  Drag and drop or Click to Select File
                </p>

                {formData.idProofFile && (
                  <p className="text-sm text-bhitarkanika-green font-medium">
                    Selected: {formData.idProofFile.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#111111] bg-white px-6 py-3 text-sm font-medium text-[#111111] hover:bg-black/5 transition-colors"
            >
              <ArrowLeft size={16} />
              BACK
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#111111] px-6 py-3 text-sm font-semibold text-white hover:bg-black transition-colors"
            >
              COMPLETE REGISTRATION
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
