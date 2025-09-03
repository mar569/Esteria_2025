import { Heart, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { FaTelegram, FaVk } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#036B43] via-[#088570] to-[#004237] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-mint-500 to-mint-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="font-bold text-xl">Esteria</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Косметологический кабинет в Шлиссельбурге.
              Забочусь о вашей красоте с 2024 года.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-t from-mint-50 via-[#18925b] to-[#741892] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <FaVk size={24} />
              </a>
              <a
                href="#"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-t from-mint-50 via-[#18925b] to-[#189245] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                aria-label="Сообщения"
              >
                <MessageCircle size={24} />
              </a>
              <a
                href="#"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-t from-mint-50 via-[#18925b] to-[#185f92] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                aria-label="Сообщения"
              >
                <FaTelegram size={24} />
              </a>

            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">Услуги</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#services" className="hover:text-mint-400 transition-colors">Биовитализация</a></li>
              <li><a href="#services" className="hover:text-mint-400 transition-colors">Аугментация губ</a></li>
              <li><a href="#services" className="hover:text-mint-400 transition-colors">Чистка лица</a></li>
              <li><a href="#services" className="hover:text-mint-400 transition-colors">Массаж лица</a></li>
              <li><a href="#services" className="hover:text-mint-400 transition-colors">RF-лифтинг</a></li>
              <li><a href="#services" className="hover:text-mint-400 transition-colors">Пилинги</a></li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-bold mb-6">Навигация</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#about" className="hover:text-mint-400 transition-colors">О нас</a></li>
              <li><a href="#appointment" className="hover:text-mint-400 transition-colors">Запись на прием</a></li>
              <li><a href="#reviews" className="hover:text-mint-400 transition-colors">Отзывы</a></li>
              <li><a href="#blog" className="hover:text-mint-400 transition-colors">Блог</a></li>
              <li><a href="#contact" className="hover:text-mint-400 transition-colors">Контакты</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Контакты</h4>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-center space-x-3">
                <Phone size={18} />
                <a href="tel:+796578877750" className="hover:text-mint-400 transition-colors">
                  +7 (965) 788-77-50
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} />
                <a href="mailto:marianna.esteria@mail.ru" className="hover:text-mint-400 transition-colors">
                  marianna.esteria@mail.ru
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="mt-1" />
                <span>Чекалова, д. 10<br />Шлиссельбург</span>
              </div>
            </div>
          </div>
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
};

export default Footer;
