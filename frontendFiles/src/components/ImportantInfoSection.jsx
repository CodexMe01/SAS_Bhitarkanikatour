import React from 'react';
import { InfoCard, ServiceCard } from './InfoCard';

const ImportantInfoSection = () => {
    return (
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-bhitarkanika-gray">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Left Side - Important Information */}
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-bhitarkanika-text mb-8 text-center lg:text-left italic" style={{ fontFamily: 'Amaranth, sans-serif' }}>Important Informations</h3>

                        {/* Pricing Information */}
                        <div className="mb-8">
                            <div className="bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200">
                                <p className="text-white text-lg text-center" style={{ fontFamily: 'Segoe UI, sans-serif' }}>Prices Mentioned above are for booking One boat and One tour.</p>
                            </div>
                            <div className="bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 mt-4">
                                <p className="text-white text-lg text-center" style={{ fontFamily: 'Segoe UI, sans-serif' }}>You can collaborate with other passengers at the boating venue to share a boat and split the cost, making your trip more affordable and enjoyable.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
                            {/* Boat Capacity Column */}
                            <div className="flex flex-col">
                                <h4 className="text-lg font-bold text-bhitarkanika-text mb-6" style={{ fontFamily: 'Amaranth, sans-serif' }}>Boat Capacity</h4>

                                <div className="space-y-4">
                                    <InfoCard
                                        icon={
                                            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                            </svg>
                                        }
                                        title="18 Guests"
                                        value=""
                                    />
                                    <InfoCard
                                        icon={
                                            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                            </svg>
                                        }
                                        title="2 Staffs"
                                        value=""
                                    />
                                </div>
                            </div>

                            {/* Boat Tour Timings Column */}
                            <div className="flex flex-col">
                                <h4 className="text-lg font-bold text-bhitarkanika-text mb-6" style={{ fontFamily: 'Amaranth, sans-serif' }}>Boat Tour Timings</h4>
                                <div className="space-y-4">
                                    <InfoCard
                                        icon={
                                            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 100 12 6 6 0 000-12z" clipRule="evenodd" />
                                                <path d="M10 6a.5.5 0 01.5.5v3.5h3a.5.5 0 010 1h-3.5a.5.5 0 01-.5-.5v-4a.5.5 0 01.5-.5z" />
                                            </svg>
                                        }
                                        title="7 AM to 10:30 AM"
                                        value=""
                                    />
                                    <InfoCard
                                        icon={
                                            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 100 12 6 6 0 000-12z" clipRule="evenodd" />
                                                <path d="M10 6a.5.5 0 01.5.5v3.5h3a.5.5 0 010 1h-3.5a.5.5 0 01-.5-.5v-4a.5.5 0 01.5-.5z" />
                                            </svg>
                                        }
                                        title="1:30 PM to 4:30 PM"
                                        value=""
                                    />
                                </div>
                            </div>

                            {/* Entry Fee Column */}
                            <div className="flex flex-col">
                                <h4 className="text-lg font-bold text-bhitarkanika-text mb-6" style={{ fontFamily: 'Amaranth, sans-serif' }}>Entry fee per Person</h4>
                                <div className="space-y-4">
                                    <InfoCard
                                        icon={
                                            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                            </svg>
                                        }
                                        title="Up to 9 Persons"
                                        value="RS. 40/-"
                                    />
                                    <InfoCard
                                        icon={
                                            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                            </svg>
                                        }
                                        title="10 to 18 Persons"
                                        value="RS. 25/-"
                                    />
                                    <InfoCard
                                        icon={
                                            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                            </svg>
                                        }
                                        title="Children Under 3 yr."
                                        value="RS. 0/-"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vertical Divider Line */}
                    <div className="hidden lg:block w-px bg-gray-300 mx-4"></div>

                    {/* Right Side - On-site Services */}
                    <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-bhitarkanika-text mb-6 sm:mb-8 text-center lg:text-left italic" style={{ fontFamily: 'Amaranth, sans-serif' }}>On-site Services</h3>
                        <div className="space-y-4 sm:space-y-5">
                            <ServiceCard
                                icon={
                                    <svg className="w-8 h-8 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                        <path d="M9 2C7.9 2 7 2.9 7 4v1H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-1V4c0-1.1-.9-2-2-2H9zm0 2h6v1H9V4zm8 3H7v10h10V7z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                }
                                title="DSLR Camera"
                                price="Rs. 50/Day"
                            />
                            <ServiceCard
                                icon={
                                    <svg className="w-8 h-8 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z" />
                                    </svg>
                                }
                                title="Video Camera"
                                price="Rs. 5000/Day"
                            />
                            <ServiceCard
                                icon={
                                    <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                    </svg>
                                }
                                title="Drone Camera"
                                subtitle="Not Allowed in Bhitarkanika"
                                price=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ImportantInfoSection;
