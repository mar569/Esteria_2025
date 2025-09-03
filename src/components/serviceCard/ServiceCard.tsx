import React from 'react';
import { Service } from '../../utils/servicesData';


type ServiceCardProps = {
    service: Service;
    onClick: () => void;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => (
    <div
        className="
      bg-gradient-to-br from-[#bfecde] via-brown-100 to-mint-100 rounded-3xl shadow-lg p-6 transition-transform hover:-translate-y-2 hover:shadow-2xl duration-500
      mx-auto
      min-w-[280px] max-w-sm
      h-[420px]
      flex flex-col
      cursor-pointer
    "
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onClick();
        }}
        aria-label={`Подробнее о процедуре ${service.title}`}
    >
        <div className="flex justify-center mb-4">{service.icon}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{service.title}</h3>
        <p className="text-gray-600 mb-4 text-center flex-grow">{service.description}</p>
        <div className="flex justify-between items-center mb-4">
            <span className="text-mint-700 font-bold text-lg">{service.price}</span>
            <span className="text-gray-800 text-sm px-3 py-1 rounded-full">{service.duration}</span>
        </div>
    </div>
);

export default ServiceCard;
