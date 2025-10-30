import React, { useRef } from 'react';
import Hero from '../components/Hero';
import AboutMe from '../components/aboutSection/AboutMe';
import Services from '../components/serviceCard/Services';
import Gallery from '../components/gallery/Gallery';
import Reviews from '../components/reviews/Reviews';
import Appointment from '../components/appointment/Appointment';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { useSectionAnimations } from '../hooks/useSectionAnimations';
import { smoothScrollTo } from '../utils/smoothScroll';
import { useService } from '../components/context/ServiceContext';
import WhyMeAndQuestions from '../components/whyMe/WhyMeAndQuestions';


const HomePage: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);
    const aboutRef = useRef<HTMLElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const reviewsRef = useRef<HTMLElement>(null);
    const servicesRef = useRef<HTMLElement>(null);
    const whymeRef = useRef<HTMLElement>(null);
    const appointmentRef = useRef<HTMLElement>(null);
    const blogRef = useRef<HTMLElement>(null);
    const contactRef = useRef<HTMLElement>(null);
    const footerRef = useRef<HTMLElement>(null);
    const { setSelectedService } = useService();

    const stats = [
        { index: '01', value: '10+', label: 'Лет опыта' },
        { index: '02', value: '500+', label: 'Довольных клиентов' },
        { index: '03', value: 'Не менее 1 года', label: 'Гарантии на процедуры' },
        { index: '04', value: 'Доступные цены', label: 'На все услуги' },
    ];

    useSectionAnimations({
        heroRef,
        aboutRef,
        servicesRef,
        whymeRef,
        contactRef,
        galleryRef,
        reviewsRef,
        appointmentRef,
        blogRef,
        footerRef,
    });

    const openAppointmentWithService = (service: string) => {
        setSelectedService(service);
        smoothScrollTo('#appointment');
    };

    const handleConsultationClick = () => {
        openAppointmentWithService('Консультация косметолога');
    };

    return (
        <div style={{ scrollBehavior: 'smooth' }}>
            <section ref={heroRef} className="hero-bg" style={{ position: 'relative', minHeight: '100vh' }}>
                <Hero />
            </section>

            <section ref={aboutRef} style={{ position: 'relative' }}>
                <AboutMe stats={stats} onConsultationClick={handleConsultationClick} />
            </section>

            <section ref={galleryRef} style={{ position: 'relative' }}>
                <Gallery />
            </section>

            <Services ref={servicesRef} onSelectService={openAppointmentWithService} />

            <section ref={whymeRef} style={{ position: 'relative' }}>
                <WhyMeAndQuestions />
            </section>

            <section ref={reviewsRef} style={{ position: 'relative' }}>
                <Reviews />
            </section>

            <section ref={appointmentRef} style={{ position: 'relative' }}>
                <Appointment />
            </section>

            <section ref={blogRef} style={{ position: 'relative' }}>
                <Blog />
            </section>

            <section ref={contactRef} style={{ position: 'relative' }}>
                <Contact />
            </section>

            <Footer ref={footerRef} />
        </div>
    );
};

export default HomePage;
