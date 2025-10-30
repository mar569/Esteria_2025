import { motion } from 'framer-motion';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';
import { FaTelegram, FaVk, FaWhatsapp } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { smoothScrollTo } from '../utils/smoothScroll';

import ScrollToTopButton from './ScrollToTopButton';
import { forwardRef } from 'react';
import { socialLinks } from '../utils/socialLinks';

const servicesLinks = [
  { href: '#services', label: 'Биоревитализация' },
  { href: '#services', label: 'Аугментация губ' },
  { href: '#services', label: 'Чистка лица' },
  { href: '#services', label: 'Массаж лица' },
  { href: '#services', label: 'RF-лифтинг' },
  { href: '#services', label: 'Пилинги' },
];

const navigationLinks = [
  { href: '#about', label: 'О нас' },
  { href: '#appointment', label: 'Запись на прием' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#blog', label: 'Блог' },
  { href: '#contact', label: 'Контакты' },
];

const Footer = forwardRef<HTMLElement>((_, ref) => {
  const handleLinkClick = (href: string) => {
    smoothScrollTo(href);
  };

  return (
    <footer className="text-white relative overflow-hidden pb-10 border-t border-gray-800" ref={ref}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_2px_2px,_white_2px,_transparent_0)] bg-[length:50px_50px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <motion.div
            className="space-y-6 "
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex space-x-2 mb-6 items-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <img src={logo} alt="" className="w-11 h-11 rounded-full" />
              </div>
              <h3 className="font-bold text-xl">Esteria</h3>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Косметологический кабинет в Шлиссельбурге.
              Забочусь о вашей красоте с 2024 года.
            </p>
            <div className="flex space-x-6">
              <motion.a
                href={socialLinks.vk}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-black/40 border border-black/10 hover:border-emerald-400 rounded-full flex items-center justify-center shadow-lg hover:text-emerald-300 transition-colors duration-800 group hover:scale-110"
                whileHover={{ scale: 1.1 }}
                aria-label="VK"
              >
                <FaVk size={24} />
              </motion.a>
              <motion.a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-black/40 border border-black/10 hover:border-emerald-400 rounded-full flex items-center justify-center shadow-lg hover:text-emerald-300 transition-colors duration-800 group hover:scale-110"
                whileHover={{ scale: 1.1 }}
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={24} />
              </motion.a>
              <motion.a
                href={socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-black/40 border border-black/10 hover:border-emerald-400 rounded-full flex items-center justify-center shadow-lg hover:text-emerald-300 transition-colors duration-800 group hover:scale-110"
                whileHover={{ scale: 1.1 }}
                aria-label="Telegram"
              >
                <FaTelegram size={24} />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white">Навигация</h3>
            <ul className="space-y-3">
              {navigationLinks.map(({ href, label }, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(href);
                    }}
                    className="flex items-center text-gray-300 hover:text-emerald-300 transition-colors duration-300 group cursor-pointer"
                  >
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white">Услуги</h3>
            <ul className="space-y-3">
              {servicesLinks.map(({ href, label }, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(href);
                    }}
                    className="flex items-center text-gray-300 hover:text-emerald-300 transition-colors duration-300 group cursor-pointer"
                  >
                    <span className="w-2 h-2 bg-teal-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white">Контакты</h3>
            <div className="space-y-4 text-gray-400">
              <motion.div
                className="flex items-start space-x-3 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <MapPin className="h-5 w-5 text-emerald-400 mt-1 group-hover:text-emerald-300 transition-colors" />
                <span className="group-hover:text-white transition-colors">
                  Чекалова, д. 10<br />Шлиссельбург
                </span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <Phone className="h-5 w-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                <a href="tel:+796578877750" className="group-hover:text-white transition-colors">
                  +7 (965) 788-77-50
                </a>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <Mail className="h-5 w-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                <a href="mailto:marianna.esteria@mail.ru" className="group-hover:text-white transition-colors">
                  marianna.esteria@mail.ru
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
        <div>
          <ScrollToTopButton />
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 Esteria. Все права защищены.
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Сделано с</span>
              <Heart className="text-red-500" size={16} />
              <span>в Шлиссельбурге</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
Footer.displayName = 'Footer';