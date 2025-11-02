import { forwardRef } from 'react';
import { MapPin, Phone, Mail, Clock, } from 'lucide-react';
import { motion } from 'framer-motion';
import { FaVk, FaWhatsapp } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import { socialLinks } from '../utils/socialLinks';

const contactVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const Contact = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      id="contact"
      className="py-16 relative"
      ref={ref}
      style={{ touchAction: 'pan-y pinch-zoom' }}
      data-parallax-speed="0.3"
    >
      <motion.div
        variants={contactVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4"
      >
        <div className="text-center mb-12 px-4 sm:px-0">
          <motion.h2
            className="text-3xl lg:text-4xl font-bold text-gray-200 mb-8 bg-gradient-to-br from-slate-200 to-slate-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Контакты
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Я нахожусь в Шлиссельбурге. Приходите ко мне!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-1"
          >
            <div
              className="contact-child bg-gradient-to-tr from-gray-300  to-gray-300 rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full"
              style={{ boxShadow: '1px 4px 16px rgba(0, 0, 0, 0.4)' }}
            >
              <div>
                <motion.h3
                  className="text-2xl font-bold text-gray-800 mb-6"
                  variants={contactVariants}
                  initial="hidden"
                  animate="visible"
                >
                  Свяжитесь со мной
                </motion.h3>

                <div className="space-y-5">
                  <motion.div
                    className="contact-child flex items-start space-x-4"
                    variants={contactVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <MapPin className="text-mint-500 mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-800">Адрес</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Чекалова, д. 10<br />
                        Шлиссельбург, 187320
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="contact-child flex items-start space-x-4"
                    variants={contactVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Phone className="text-mint-500 mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-800">Телефон</h4>
                      <a href="tel:+79657887750" className="hover:text-mint-400 text-gray-600 transition-colors">
                        +7 (965) 788-77-50
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="contact-child flex items-start space-x-4"
                    variants={contactVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Mail className="text-mint-500 mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <a href="mailto:marianna.esteria@mail.ru" className="hover:text-mint-400 text-gray-600 transition-colors">
                        marianna.esteria@mail.ru
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="contact-child flex items-start space-x-4"
                    variants={contactVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Clock className="text-mint-500 mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-800">Режим работы</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Пн-Вс: 9:00 - 20:00<br />
                        Без выходных
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-400 contact-child">
                <motion.h4
                  className="font-semibold text-gray-800 mb-4"
                  variants={contactVariants}
                  initial="hidden"
                  animate="visible"
                >
                  Я в соцсетях
                </motion.h4>
                <div className="flex space-x-6">
                  <motion.a
                    href={socialLinks.vk}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-black/50 border border-black/10 hover:border-emerald-400 rounded-full flex items-center justify-center shadow-lg hover:text-emerald-300 transition-colors duration-800 group hover:scale-110"
                    aria-label="VK"
                    variants={contactVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <FaVk size={24} />
                  </motion.a>
                  <motion.a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-black/50 border border-black/10 hover:border-emerald-400 rounded-full flex items-center justify-center shadow-lg hover:text-emerald-300 transition-colors duration-800 group hover:scale-110"
                    aria-label="Сообщения"
                    variants={contactVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <FaWhatsapp size={24} />
                  </motion.a>
                  <motion.a
                    href={socialLinks.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-black/50 border border-black/10 hover:border-emerald-400 rounded-full flex items-center justify-center shadow-lg hover:text-emerald-300 transition-colors duration-800 group hover:scale-110"
                    aria-label="Telegram"
                    variants={contactVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <FaTelegram size={24} />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="lg:col-span-2"
          >
            <div
              className="contact-child bg-gradient-to-tr from-gray-300  to-gray-300 rounded-3xl overflow-hidden h-full min-h-[400px] relative"
              style={{ boxShadow: '1px 4px 16px rgba(0, 0, 0, 0.4)' }}
            >
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=31.034619%2C59.946545&mode=search&oid=212797798932&ol=biz&utm_source=share&z=16.79"
                width="100%"
                height="400"
                frameBorder="0"
                allowFullScreen
                loading="lazy"
                className="block"
                title="Карта Esteria"
              ></iframe>

              <div
                className="relative bg-gradient-to-tl from-gray-100  to-gray-200 mt-10 mb-4 backdrop-blur-xl rounded-tl-sm rounded-br-2xl p-4 ml-2 shadow-lg max-w-xs sm:max-w-sm contact-child"
                style={{ boxShadow: '1px 4px 16px rgba(0, 0, 0, 0.4)' }}
              >
                <motion.h4
                  className="font-bold text-gray-800 mb-1"
                  variants={contactVariants}
                  initial="hidden"
                  animate="visible"
                >
                  Esteria
                </motion.h4>
                <p className="text-gray-600 text-sm">Чекалова, д. 10</p>
                <p className="text-mint-600 text-sm font-semibold">Открыто до 20:00</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;
