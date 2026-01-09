import React from 'react';

export const InfoCard = ({ icon, title, value }) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center space-x-3">
        <div className="text-bhitarkanika-green">
          {icon}
        </div>
        <div>
          <h4 className="font-semibold text-bhitarkanika-text text-sm">{title}</h4>
          {value && <p className="text-bhitarkanika-green font-bold text-lg">{value}</p>}
        </div>
      </div>
    </div>
  );
};

export const ServiceCard = ({ icon, title, subtitle, price }) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start space-x-3">
        <div className="text-gray-700 flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-bhitarkanika-text text-sm mb-1">{title}</h4>
          {subtitle && <p className="text-gray-500 text-xs mb-2">{subtitle}</p>}
          {price && <p className="text-bhitarkanika-green font-bold text-lg">{price}</p>}
        </div>
      </div>
    </div>
  );
};

