import React, { useEffect, useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { easeInOut } from 'framer-motion';
import ServicesAccordion from './ServicesAccordion';
import ServicePopup from './ServicePopup';

type ServicesProps = {
  onSelectService: (service: string) => void;
};

const servicesVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeInOut } },
  itemVariants: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeInOut } },
  },
};

const Services = forwardRef<HTMLElement, ServicesProps>(({ onSelectService }, ref) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleServiceClick = (serviceName: string) => {
    onSelectService(serviceName);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            setShowPopup(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref && 'current' in ref && ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref && 'current' in ref && ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return (
    <section
      id="services"
      className="relative py-20"
      ref={ref}
      data-parallax-speed="0.2"
    >
      <motion.div
        className="container mx-auto px-4"
        variants={servicesVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, ease: easeInOut }}
      >
        <div className="text-center mb-10">
          <motion.h2
            className="text-3xl lg:text-4xl font-bold text-gray-200 mb-6 bg-gradient-to-br from-slate-200 to-slate-400 bg-clip-text text-transparent"
            variants={servicesVariants.itemVariants}
          >
            Мои услуги
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            variants={servicesVariants.itemVariants}
          >
            Предлагаю полный спектр косметологических процедур
          </motion.p>
        </div>

        <ServicesAccordion onSelectService={handleServiceClick} customIndex={0} categoryTrigger={0} />
      </motion.div>

      <AnimatePresence>
        {showPopup && <ServicePopup onClose={() => setShowPopup(false)} />}
      </AnimatePresence>
    </section>
  );
});

Services.displayName = 'Services';

export default Services;
