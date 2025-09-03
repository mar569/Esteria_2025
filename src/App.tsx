import { useState, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import PageLayout from './components/PageLayout';
import ScrollToTopButton from './components/ScrollToTopButton';




const Hero = lazy(() => import('./components/Hero'));
const Services = lazy(() => import('./components/serviceCard/Services'));
const About = lazy(() => import('./components/About'));
const Gallery = lazy(() => import('./components/Gallery'));
const Appointment = lazy(() => import('./components/Appointment'));
const Reviews = lazy(() => import('./components/Reviews'));
const Blog = lazy(() => import('./components/Blog'));
const Contact = lazy(() => import('./components/Contact'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  const [selectedServiceForAppointment, setSelectedServiceForAppointment] = useState('');
  const location = useLocation();

  const openAppointmentWithService = (service: string) => {
    setSelectedServiceForAppointment(service);
    const appointmentSection = document.getElementById('appointment');
    if (appointmentSection) {
      appointmentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const hideHeader = location.pathname.startsWith('/blog/') && location.pathname !== '/blog';

  return (
    <PageLayout hideHeader={hideHeader}>
      <Suspense fallback={<div className='spinner_suspense'></div>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Services onSelectService={openAppointmentWithService} />
                <About onConsultationClick={() => openAppointmentWithService('Консультация косметолога')} />
                <Gallery />
                <Appointment selectedService={selectedServiceForAppointment} />
                <Reviews />
                <Blog />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<ArticlePage />} />
        </Routes>
      </Suspense>
      <ScrollToTopButton />
    </PageLayout>
  );
}

export default App;
