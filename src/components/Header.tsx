import React, { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import SparkleNavbar from './lightswind/SparkleNavbar';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';
import { commonVariants } from '../utils/animations';

const navItems = [
  { name: 'Главная', href: '#hero' },
  { name: 'Обо мне', href: '#about' },
  { name: 'Услуги', href: '#services' },
  { name: 'Отзывы', href: '#reviews' },
  { name: 'Запись', href: '#appointment' },
  { name: 'Блог', href: '#blog' },
  { name: 'Контакты', href: '#contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      let current = '';
      for (const item of navItems) {
        const el = document.getElementById(item.href.replace('#', ''));
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;

          if (scrollPos >= top && scrollPos < top + height) {
            current = item.href;
            break;
          }
        }
      }

      if (!current && scrollPos > 0) {
        const lastItem = navItems[navItems.length - 1];
        const lastEl = document.getElementById(lastItem.href.replace('#', ''));
        if (lastEl && scrollPos >= lastEl.offsetTop) {
          current = lastItem.href;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Вызываем сразу для начального состояния
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={commonVariants.fadeIn}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-600 `}
    >
      <div className="container mx-auto md:px-2 px-4 mt-4 flex items-center justify-between bg-white/5 rounded-full">
        <motion.div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          variants={commonVariants.fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <img src={logo} alt="Логотип" className='w-11 h-11 rounded-full' />
          </div>
          <h3
            className={`font-bold text-xl transition-colors select-none ${isScrolled ? 'text-gray-700' : 'text-white'}`}
          >
            Esteria
          </h3>
        </motion.div>

        <div className="hidden lg:block sectbg">
          <SparkleNavbar
            items={navItems.map(item => item.name)}
            color={isScrolled ? '#4B5563' : '#00fffc'}
            onItemClick={index => scrollToSection(navItems[index].href)}
          />
        </div>

        <motion.div
          className="hidden lg:flex items-center space-x-4"
          variants={commonVariants.fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <a
            href="tel:+78123456789"
            className={`flex items-center space-x-2 transition-colors duration-500 hover:text-mint-500 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
          >
            <Phone size={18} />
            <span className="font-medium">+7 (965) 788-77-50</span>
          </a>
        </motion.div>
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden p-2 transition-colors z-60 ${isMobileMenuOpen ? 'text-gray-700' : isScrolled ? 'text-gray-700' : 'text-white'}`}
          aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          variants={commonVariants.fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={commonVariants.fadeIn}
            className="fixed inset-0 bg-white/10 backdrop-blur-lg z-50 p-6  overflow-auto flex flex-col "
            aria-label="Мобильное меню навигации"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex flex-col space-y-4" onClick={e => e.stopPropagation()}>
              {navItems.map(item => {
                const isActive = activeSection === item.href;
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={e => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      scrollToSection(item.href);
                    }}

                    className={`relative px-4 py-3 rounded-r-xl font-semibold text-lg transition-colors ${isActive
                      ? 'text-mint-500 bg-[#aeeacf56] '
                      : 'text-white hover:text-mint-300 hover:bg-[#b0c2ba56]'
                      }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-mint-500 " />
                    )}
                    {item.name}
                  </motion.a>
                );
              })}
              <motion.a
                href="tel:+79657887750"
                className="flex items-center space-x-2 pt-6 border-t border-white/20 text-mint-200 hover:text-mint-300 transition-colors font-semibold"
                variants={commonVariants.fadeIn}
              >
                <Phone size={18} />
                <span className='pt-0.5'>+7 (965) 788-77-50</span>
              </motion.a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
