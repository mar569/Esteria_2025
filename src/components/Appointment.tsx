import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type AppointmentProps = {
  selectedService: string;
};

const timePreferences = [
  'Утром (9:00 - 12:00)',
  'Днем (12:00 - 16:00)',
  'Вечером (16:00 - 20:00)',
  'В выходные',
  'Любое удобное время',
];

const Appointment: React.FC<AppointmentProps> = ({ selectedService }) => {
  const [service, setService] = useState(selectedService);
  const [date, setDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [showModal, setShowModal] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    setService(selectedService);
  }, [selectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!service || !date) {
      alert('Пожалуйста, выберите услугу и дату');
      return;
    }
    setShowModal(true);
  };

  const messageTemplate = `Здравствуйте, хочу записаться или узнать подробнее про услугу "${service}". Желаемая дата ${date}. Предпочтительное время: ${preferredTime || 'не указано'}.`;

  const openMessenger = (messenger: 'whatsapp' | 'telegram' | 'vk') => {
    const messengerLinks = {
      whatsapp: (text: string) => `https://wa.me/71234567890?text=${encodeURIComponent(text)}`,
      telegram: (text: string) => `https://t.me/esteria_shlisselburg?text=${encodeURIComponent(text)}`,
      vk: (text: string) => `https://vk.me/your_vk_community?text=${encodeURIComponent(text)}`,
    };
    const url = messengerLinks[messenger](messageTemplate);
    window.open(url, '_blank');
    setShowModal(false);
  };

  return (
    <section
      id="appointment"
      className="px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#bfecde] via-brown-100 to-mint-100 min-h-screen flex items-center justify-center"
      ref={ref}
    >
      <motion.div
        className="
          w-full
          max-w-md
          sm:max-w-lg
          md:max-w-xl
          lg:max-w-2xl
          bg-white
          rounded-3xl
          shadow-2xl
          p-6 sm:p-8 md:p-10
          space-y-6
          flex flex-col
          min-h-[480px]
          sm:min-h-[520px]
          md:min-h-[560px]
          lg:min-h-[600px]
        "
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          Запись на прием
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col flex-grow justify-between"
          noValidate
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="date" className="block mb-2 font-semibold text-gray-700">
                Выберите дату
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-3 border-2 border-mint-700 rounded-xl focus:border-mint-500 focus:outline-none transition-colors text-base"
              />
            </div>

            <div>
              <label htmlFor="service" className="block mb-2 font-semibold text-gray-700">
                Выберите услугу
              </label>
              <select
                id="service"
                value={service}
                onChange={e => setService(e.target.value)}
                required
                className="w-full max-w-full px-3 py-3 border-2 border-mint-700 rounded-xl focus:border-mint-500 focus:outline-none transition-colors text-base truncate"
              >
                <option value="" className="text-gray-400">
                  Выберите услугу
                </option>
                {[
                  'Аугментация губ',
                  'Чистка лица',
                  'Массаж лица',
                  'RF-лифтинг',
                  'Пилинги',
                  'Ботулинотерапия (1 ед.)',
                  'Липолитики по телу 5ml. (непрямые) ',
                  'Липолитики по лицу 5ml. (непрямые) ',
                  'Коллаген Nithya',
                  'Мезотерапия (лицо, шея, кожа головы)',
                  'Биоревитализация',
                  'Аугментация губ (инъекционная)',
                  'Фракционная мезотерапия',
                  'Альгинатная маска',
                  'Карбокситерапия (Mesomatrix)',
                  'Косметический пилинг (BioRe Peel)',
                  'Консультация косметолога',
                  'Комбинированная чистка лица',
                  'Ультразвуковая чистка лица',
                ].map(srv => (
                  <option key={srv} value={srv} className="truncate">
                    {srv}
                  </option>
                ))}
              </select>

            </div>

            <div>
              <label htmlFor="preferredTime" className="block mb-2 font-semibold text-gray-700">
                Предпочтительное время
              </label>
              <select
                id="preferredTime"
                value={preferredTime}
                onChange={e => setPreferredTime(e.target.value)}
                className="w-full px-3 py-3 border-2 border-mint-700 rounded-xl focus:border-mint-500 focus:outline-none transition-colors text-base"
              >
                <option value="">Выбрать</option>
                {timePreferences.map(time => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            style={{
              background: `radial-gradient(
                212.58% 2646.98% at 35.86% 50%,
                #158875 0,
                #04ae78 48.96%,
                #016238 100%
              )`,
            }}
            className="mt-6 w-full text-white font-semibold py-4 rounded-xl hover:scale-105 transition-transform duration-300"
          >
            Записаться
          </button>
        </motion.form>

        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-xs w-full text-center space-y-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold">Выберите мессенджер</h3>
              <button
                onClick={() => openMessenger('whatsapp')}
                className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                WhatsApp
              </button>
              <button
                onClick={() => openMessenger('telegram')}
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Telegram
              </button>
              <button
                onClick={() => openMessenger('vk')}
                className="w-full py-2 bg-[#4a76a8] text-white rounded-lg hover:bg-[#3b5a7a] transition"
              >
                ВКонтакте
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 text-gray-600 underline"
              >
                Отмена
              </button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default Appointment;
