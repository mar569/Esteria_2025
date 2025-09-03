import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Service } from '../../utils/servicesData';
import ServiceCard from './ServiceCard';


type ServicesSliderProps = {
    services: Service[];
    onServiceClick: (title: string) => void;
    onClose: () => void;
};

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
        scale: 0.8,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 300 : -300,
        opacity: 0,
        scale: 0.8,
    }),
};

const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

const Slide: React.FC<ServicesSliderProps> = ({ services, onServiceClick, onClose }) => {
    const [[currentIndex, direction], setCurrentIndex] = useState<[number, number]>([0, 0]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const paginate = (newDirection: number) => {
        setCurrentIndex(([prevIndex]) => {
            let newIndex = prevIndex + newDirection;
            if (newIndex < 0) newIndex = services.length - 1;
            else if (newIndex >= services.length) newIndex = 0;
            return [newIndex, newDirection];
        });
    };
    return (
        <AnimatePresence initial={false} mode="wait">
            <motion.div
                key="backdrop"
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={onClose}
            >
                <motion.div
                    key={currentIndex}
                    className="relative max-w-md w-full"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    onClick={(e) => e.stopPropagation()} // чтобы клик по карточке не закрывал слайдер
                >
                    <ServiceCard
                        service={services[currentIndex]}
                        onClick={() => onServiceClick(services[currentIndex].title)}
                    />

                    <button
                        onClick={() => paginate(-1)}
                        aria-label="Предыдущая услуга"
                        className="absolute top-1/2 -left-20 transform -translate-y-1/2 bg-mint-600 text-white rounded-2xl px-3 py-2 hover:bg-mint-700 transition-colors duration-300 text-2xl"
                    >
                        &#8592;
                    </button>
                    <button
                        onClick={() => paginate(1)}
                        aria-label="Следующая услуга"
                        className="absolute top-1/2 -right-20 transform -translate-y-1/2 bg-mint-600 text-white rounded-2xl px-3 py-2 hover:bg-mint-700 transition-colors duration-300 text-2xl"
                    >
                        &#8594;
                    </button>

                    <div className="text-center mt-6">
                        <button
                            onClick={onClose}
                            className="text-mint-600 underline hover:text-mint-700"
                        >
                            Скрыть
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Slide;
