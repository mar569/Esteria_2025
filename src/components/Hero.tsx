import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import place from '../assets/place.png';
import heroImg from '../assets/hero.png';
import { smoothScrollTo } from '../utils/smoothScroll';

const buttonVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.4 } },
};

const Hero = forwardRef<HTMLElement>((_props, ref) => {
  return (
    <section
      id="hero"
      className="min-h-screen relative flex items-center justify-center overflow-hidden md:pt-0 pt-10 pb-20 hero-bg"
      ref={ref}
      aria-labelledby="hero-title"
    >
      <img
        className="hero-bg-image absolute inset-0 w-full h-full object-cover"
        src={heroImg}
        alt="Фоновая иллюстрация косметологических процедур"
        loading="lazy"
        style={{ zIndex: -1, willChange: 'transform' }}
      />


      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className="hero-content" style={{ willChange: 'transform' }}>
            <div className="flex items-center space-x-2 mb-6 hero-title">
              <Sparkles className="text-mint-300 animate-pulse" size={24} />
              <span className="text-mint-300 font-medium uppercase tracking-wider text-sm">
                Косметология
              </span>
            </div>


            <h1
              id="hero-title"
              className="hero-title text-4xl lg:text-6xl font-bold text-gray-300 mb-6 leading-tight"
            >
              Красота и уход
              <span className="block text-[#027A52]">для вашей кожи</span>
            </h1>

            <p className="hero-title text-lg text-gray-300 mb-8 leading-relaxed">
              Профессиональные косметологические процедуры в Шлиссельбурге.
              Массажи (PlasticLift), чистки лица, биоревитализация, аугментация губ и многое другое — всё в уютной и комфортной обстановке.
            </p>


            <div className="flex flex-col sm:flex-row gap-4 hero-title">
              <motion.a
                href="#appointment"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo('#appointment');
                }}
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: `radial-gradient(212.58% 2646.98% at 35.86% 50%, #158875 0%, #04ae78 48.96%, #016238 100%)`,
                }}
                className="inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 group"
                aria-label="Записаться на прием"
              >
                Записаться на прием
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </motion.a>

              <motion.a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo('#services');
                }}
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05, backgroundColor: '#04ae78', color: 'white' }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-mint-600 text-mint-700 font-semibold rounded-full hover:bg-mint-600 hover:text-white transition-all duration-300 group"
                aria-label="Посмотреть услуги"
              >
                Мои услуги
              </motion.a>
            </div>
          </div>


          <div
            className=" hero-title relative cursor-pointer transition-shadow duration-300 hover:shadow-2xl rounded-3xl"
            style={{ willChange: 'transform' }}
          >

            <div className="absolute inset-0 bg-gradient-to-r from-mint-400/20 to-beige-400/20 rounded-3xl blur-3xl"></div>
            <img
              src={place}
              alt="Косметологические процедуры в салоне"
              className="relative w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-tr from-black/70 to-transparent rounded-3xl"></div>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-mint-500 rounded-full flex justify-center cursor-pointer"
          onClick={() => smoothScrollTo('#about')}
          aria-label="Прокрутить вниз"
        >
          <ChevronDown className="w-4 h-4 text-mint-500 mt-2 animate-pulse" />
        </motion.div>
      </motion.div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;