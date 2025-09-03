import { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import SparkleNavbar from './lightswind/SparkleNavbar';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Главная', href: '#hero' },
  { name: 'Услуги', href: '#services' },
  { name: 'Обо мне', href: '#about' },
  { name: 'Запись', href: '#appointment' },
  { name: 'Отзывы', href: '#reviews' },
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
      const scrollPos = window.scrollY + window.innerHeight / 3;
      let current = '';
      for (const item of navItems) {
        const el = document.getElementById(item.href.replace('#', ''));
        if (el && el.offsetTop <= scrollPos) {
          current = item.href;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, when: "beforeChildren" } },
    exit: { opacity: 0, y: -20, transition: { when: "afterChildren" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <header
      className={`absolute top-0 left-0 right-0 z-50 transition-all duration-600 ${isScrolled ? 'bg-mint-300 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-mint-400 to-beige-400 flex items-center justify-center">
            <span className="text-white font-bold text-lg select-none">Э</span>
          </div>
          <span
            className={`font-bold text-xl transition-colors select-none ${isScrolled ? 'text-gray-700' : 'text-white'
              }`}
          >
            Esteria
          </span>
        </div>

        <div className="hidden lg:block">
          <SparkleNavbar
            items={navItems.map(item => item.name)}
            color={isScrolled ? '#4B5563' : '#00fffc'}
            onItemClick={index => scrollToSection(navItems[index].href)}
          />
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <a
            href="tel:+78123456789"
            className={`flex items-center space-x-2 transition-colors hover:text-mint-500 ${isScrolled ? 'text-gray-700' : 'text-white'
              }`}
          >
            <Phone size={18} />
            <span className="font-medium">+7 (965) 788-77-50</span>
          </a>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden p-2 transition-colors z-60 ${isMobileMenuOpen ? 'text-gray-700' : isScrolled ? 'text-gray-700' : 'text-white'}`}
          aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>


      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="fixed inset-0 bg-white/15 backdrop-blur-md z-50 p-6 overflow-auto flex flex-col"
            aria-label="Мобильное меню навигации"
          >
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
                  variants={itemVariants}
                  className={`relative px-4 py-3 rounded-lg font-semibold text-lg transition-colors ${isActive
                    ? 'text-mint-600 bg-mint-100 shadow-md'
                    : 'text-gray-700 hover:text-mint-500 hover:bg-mint-50'
                    }`}
                >

                  {isActive && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-mint-600" />
                  )}
                  {item.name}
                </motion.a>
              );
            })}
            <motion.a
              href="tel:+79657887750"
              className="flex items-center space-x-2 pt-6 border-t border-gray-300 text-gray-700 hover:text-mint-500 transition-colors"
            >
              <Phone size={18} />
              <span>+7 (965) 788-77-50</span>
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
