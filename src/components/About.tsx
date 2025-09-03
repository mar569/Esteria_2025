import React, { useRef } from 'react';
import { Award, Users, Clock, Shield } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import me from '../assets/me.jpg';

type AboutProps = {
  onConsultationClick: () => void;
};

const About: React.FC<AboutProps> = ({ onConsultationClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    {
      icon: <Users className="text-mint-500" size={32} />,
      number: '100+',
      label: 'Довольных клиентов',
    },
    {
      icon: <Award className="text-mint-500" size={32} />,
      number: '2',
      label: 'Года опыта',
    },
    {
      icon: <Clock className="text-mint-500" size={32} />,
      number: '120+',
      label: 'Процедур проведено',
    },
    {
      icon: <Shield className="text-mint-500" size={32} />,
      number: '100%',
      label: 'Безопасность',
    },
  ];

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-mint-50 via-[#bfecde] to-brown-100"
      ref={ref}
    >
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">О моем кабинете</h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              Я — сертифицированный косметолог с медицинским образованием и страстью к красоте. Моя цель — помочь вам подчеркнуть естественную привлекательность и чувствовать себя уверенно каждый день.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Использую только проверенные препараты и современное оборудование, чтобы обеспечить безопасность и лучшие результаты.
            </p>
            <div className="relative">
              <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-mint-200/40 animate-bounce delay-1000"></div>
              <div className="absolute bottom-20 right-1 w-16 h-16 rounded-full bg-lime-200/40 animate-bounce delay-500"></div>
            </div>
            <blockquote className="border-l-4 border-mint-400 pl-4 italic text-gray-500 mb-8">
              "Красота — это уверенность, и я здесь, чтобы помочь вам её обрести."
            </blockquote>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-gradient-to-br from-mint-100 to-beige-50 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex justify-center mb-3 text-mint-800">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={onConsultationClick}
                style={{
                  background: `radial-gradient(
                    212.58% 2646.98% at 35.86% 50%,
                    #158875 0,
                    #04ae78 48.96%,
                    #016238 100%
                  )`,
                }}
                className="text-white px-6 py-3 rounded-full font-semibold hover:bg-mint-600 transition"
              >
                Запишитесь на консультацию
              </button>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-mint-400/20 to-[#d5ba96] rounded-3xl blur-3xl"></div>
            <img
              src={me}
              alt="Мой фотография"
              className="relative w-full h-100 lg:h-[780px] object-cover rounded-3xl shadow-2xl"
            />
            <div className="absolute -bottom-20 right-0 bg-white/90 rounded-2xl p-6 shadow-xl max-w-[300px]">
              <h4 className="font-bold text-gray-800 mb-2">Марианна Владимировна</h4>
              <p className="text-gray-600 text-sm mb-3">Косметолог | Медицинское образование</p>
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-500 text-sm">Специалист с индивидуальным подходом</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
