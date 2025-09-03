import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ServiceCard, { Service } from "../serviceCard/ServiceCard";

interface Carousel3DProps {
    services: Service[];
    onServiceClick: (title: string) => void;
    autoRotate?: boolean;
    rotateInterval?: number;
    cardHeight?: number;
    onClose: () => void;
}

const Carousel3D: React.FC<Carousel3DProps> = ({
    services,
    onServiceClick,
    onClose,
    autoRotate = true,
    rotateInterval = 6000,
    cardHeight = 420,
}) => {
    const [active, setActive] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const minSwipeDistance = 50;

    // Проверка мобильного устройства
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Intersection Observer для видимости карусели
    useEffect(() => {
        if (!carouselRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0.8 }
        );
        observer.observe(carouselRef.current);
        return () => observer.disconnect();
    }, []);

    // Автопрокрутка
    useEffect(() => {
        if (autoRotate && isInView && !isHovering) {
            const interval = setInterval(() => {
                setActive((prev) => (prev + 1) % services.length);
            }, rotateInterval);
            return () => clearInterval(interval);
        }
    }, [autoRotate, isInView, isHovering, rotateInterval, services.length]);

    // Обработчики свайпа
    const onTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
        setTouchStart(e.targetTouches[0].clientX);
        setTouchEnd(null);
    }, []);

    const onTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
        setTouchEnd(e.targetTouches[0].clientX);
    }, []);

    const onTouchEnd = useCallback(() => {
        if (touchStart === null || touchEnd === null) return;
        const distance = touchStart - touchEnd;
        if (distance > minSwipeDistance) {
            setActive((prev) => (prev + 1) % services.length);
        } else if (distance < -minSwipeDistance) {
            setActive((prev) => (prev - 1 + services.length) % services.length);
        }
    }, [touchStart, touchEnd, services.length]);

    // Мемоизация класса анимации карточки
    const getCardAnimationClass = useCallback(
        (index: number) => {
            if (index === active) return "scale-100 opacity-100 z-20";
            if (index === (active + 1) % services.length)
                return "translate-x-[40%] scale-95 opacity-60 z-10";
            if (index === (active - 1 + services.length) % services.length)
                return "translate-x-[-40%] scale-95 opacity-60 z-10";
            return "scale-90 opacity-0 pointer-events-none";
        },
        [active, services.length]
    );

    // Мемоизация обработчика клика по карточке
    const handleCardClick = useCallback(
        (title: string) => {
            onClose();
            onServiceClick(title);
            const appointmentSection = document.getElementById("appointment");
            if (appointmentSection) {
                appointmentSection.scrollIntoView({ behavior: "smooth" });
            }
        },
        [onClose, onServiceClick]
    );

    // Мемоизация списка карточек
    const cards = useMemo(
        () =>
            services.map((service, index) => (
                <div
                    key={service.title + index}
                    className={`absolute top-0 w-full max-w-sm transform transition-all duration-500 ${getCardAnimationClass(
                        index
                    )}`}
                    style={{ height: cardHeight }}
                >
                    <ServiceCard service={service} onClick={() => handleCardClick(service.title)} />
                </div>
            )),
        [services, getCardAnimationClass, handleCardClick, cardHeight]
    );

    // Обработчики кнопок переключения
    const prevSlide = useCallback(() => {
        setActive((prev) => (prev - 1 + services.length) % services.length);
    }, [services.length]);

    const nextSlide = useCallback(() => {
        setActive((prev) => (prev + 1) % services.length);
    }, [services.length]);

    return (
        <section
            id="carousel3d"
            className="bg-transparent min-w-full mx-auto flex items-center justify-center"
        >
            <div className="w-full px-4 sm:px-6 lg:px-8 min-w-[360px] max-w-7xl">
                <div
                    className="relative overflow-hidden min-h-[420px] h-[60vh] lg:h-[65vh] 2xl:h-[70vh]"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    ref={carouselRef}
                >
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        {cards}
                    </div>

                    {!isMobile && (
                        <>
                            <button
                                onClick={prevSlide}
                                aria-label="Предыдущая услуга"
                                className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-mint-600 text-white rounded-full flex items-center justify-center hover:bg-mint-700 transition-colors duration-300 shadow-md z-30"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextSlide}
                                aria-label="Следующая услуга"
                                className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-mint-600 text-white rounded-full flex items-center justify-center hover:bg-mint-700 transition-colors duration-300 shadow-md z-30"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-3 z-30">
                        {services.map((_, idx) => (
                            <button
                                key={idx}
                                className={`w-6 h-4 rounded-full transition-all duration-300 ${active === idx ? "bg-[#7db39b] w-8" : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                                onClick={() => setActive(idx)}
                                aria-label={`Перейти к услуге ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Carousel3D;
