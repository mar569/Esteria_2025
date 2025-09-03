import React from 'react';
import { Service } from '../../utils/servicesData';
import ServiceCard from './ServiceCard';


type ServicesGridProps = {
    services: Service[];
    onServiceClick: (title: string) => void;
    onClose: () => void;
};

const ServicesGrid: React.FC<ServicesGridProps> = ({ services, onServiceClick, onClose }) => (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
        {services.map((service) => (
            <ServiceCard
                key={service.title}
                service={service}
                onClick={() => {
                    onClose();
                    onServiceClick(service.title);
                    const appointmentSection = document.getElementById('appointment');
                    if (appointmentSection) {
                        appointmentSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
            />
        ))}
    </div>
);

export default ServicesGrid;
