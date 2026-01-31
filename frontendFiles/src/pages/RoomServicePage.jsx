import React, { useEffect } from 'react';

const RoomServicePage = () => {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-bhitarkanika-gray flex items-center justify-center px-4">
            <div className="max-w-2xl w-full bg-white rounded-3xl p-8 sm:p-12 shadow-xl text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-bhitarkanika-text mb-6 font-amaranth">
                    Room Inquiry
                </h1>
                <div className="space-y-4">
                    <p className="text-lg sm:text-xl text-gray-700 font-medium">
                        For room inquiry, please contact:
                    </p>
                    <a
                        href="tel:+919178994463"
                        className="block text-2xl sm:text-3xl font-bold text-bhitarkanika-green hover:text-bhitarkanika-dark transition-colors"
                    >
                        9178994463
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RoomServicePage;
