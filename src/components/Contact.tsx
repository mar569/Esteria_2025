import { useRef } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { FaVk } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-[#bfecde] via-brown-100 to-mint-100"
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-16 px-4 sm:px-0">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
            Контакты
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Я нахожусь в Шлиссельбурге. Приходите ко мне!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col justify-between h-full">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Свяжитесь с нами
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start space-x-4">
                    <MapPin className="text-mint-500 mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-800">Адрес</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Чекалова, д. 10<br />
                        Шлиссельбург, 187320
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="text-mint-500 mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-800">Телефон</h4>
                      <a href="tel:+796578877750" className="hover:text-mint-400 text-gray-600 transition-colors">
                        +7 (965) 788-77-50
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="text-mint-500 mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <a href="mailto:marianna.esteria@mail.ru" className="hover:text-mint-400 text-gray-600 transition-colors">
                        marianna.esteria@mail.ru
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="text-mint-500 mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-800">Режим работы</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Пн-Вс: 9:00 - 20:00<br />
                        Без выходных
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-300 bg-brown-50">
                <h4 className="font-semibold text-gray-800 mb-4">Я в соцсетях</h4>
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
            </div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg h-full min-h-[400px] relative">
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

              <div className="relative bg-white/25 mt-10 backdrop-blur-xl rounded-2xl p-4 shadow-lg max-w-xs sm:max-w-sm">
                <h4 className="font-bold text-gray-800 mb-1">Esteria</h4>
                <p className="text-gray-600 text-sm">Чекалова, д. 10</p>
                <p className="text-mint-600 text-sm font-semibold">Открыто до 20:00</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
