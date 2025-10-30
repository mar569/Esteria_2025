import React, { useState, useEffect, forwardRef } from 'react';
import { motion } from 'framer-motion';

import { useService } from '../context/ServiceContext';
import MessengerDialog from './MessengerDialog';

const timePreferences = [
  'Утром (9:00 - 12:00)',
  'Днем (12:00 - 16:00)',
  'Вечером (16:00 - 20:00)',
  'Любое удобное время',
];

const Appointment = forwardRef<HTMLElement>((_props, ref) => {
  const { selectedService } = useService();
  const [service, setService] = useState(selectedService || '');
  const [date, setDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (isDialogOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDialogOpen]);

  useEffect(() => {
    if (selectedService && selectedService !== service) {
      setService(selectedService);
    }
  }, [selectedService, service]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!service || !date) {
      alert('Пожалуйста, выберите услугу и дату');
      return;
    }
    setIsDialogOpen(true);
  };

  const messageTemplate = `Здравствуйте, хочу записаться или узнать подробнее про услугу "${service}". Желаемая дата ${date}. Предпочтительное время: ${preferredTime || 'не указано'}.`;

  const openMessenger = (messenger: 'whatsapp' | 'telegram' | 'vk') => {
    const messengerLinks = {
      whatsapp: (text: string) => `https://wa.me/79657887750?text=${encodeURIComponent(text)}`,
      telegram: (text: string) => `https://t.me/esteria_shlisselburg?text=${encodeURIComponent(text)}`,
      vk: (text: string) => `https://vk.me/esterum_cosmo?text=${encodeURIComponent(text)}`,
    };
    const url = messengerLinks[messenger](messageTemplate);
    window.open(url, '_blank');
    setIsDialogOpen(false);
  };

  const appointmentVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <section
      id="appointment"
      className="px-4 sm:px-6 lg:px-8 flex items-center justify-center h-full min-h-[702px] relative scrollbar-hide"
      ref={ref}
      data-parallax-speed="0.4"
      style={{ touchAction: 'pan-y pinch-zoom' }}
    >
      <motion.div
        className="
          w-full
          max-w-md
          sm:max-w-lg
          md:max-w-xl
          lg:max-w-2xl
      bg-gradient-to-tr from-gray-300  to-gray-300
          rounded-3xl
          shadow-2xl
          p-6 sm:p-8 md:p-10
          space-y-6
          flex flex-col
          min-h-[480px]
          sm:min-h-[520px]
          md:min-h-[540px]
          lg:min-h-[600px]
          animate-on-scroll"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h2
          className="appointment-child text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          Запись на прием
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col flex-grow justify-between appointment-child"
          noValidate
          variants={appointmentVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-5">
            <div className="appointment-child">
              <label htmlFor="date" className="block mb-2 font-semibold text-gray-700">
                Выберите дату
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-3 border-2 border-mint-700 rounded-xl focus:border-mint-500 bg-transparent focus:outline-none transition-colors text-black"
              />
            </div>

            <div className="appointment-child">
              <label htmlFor="service" className="block mb-2 font-semibold text-gray-700">
                Выберите услугу
              </label>
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                required
                className="w-full max-w-full px-3 py-3 border-2 border-mint-700 rounded-xl focus:border-mint-500 bg-transparent focus:outline-none transition-colors text-black truncate"
              >
                <option value="" className="text-gray-400">
                  Выберите услугу
                </option>
                {[
                  'Аугментация губ',
                  'Чистка лица',
                  'Массаж лица',
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
                ].map((srv) => (
                  <option key={srv} value={srv} className="truncate">
                    {srv}
                  </option>
                ))}
              </select>
            </div>

            <div className="appointment-child">
              <label htmlFor="preferredTime" className="block mb-2 font-semibold text-gray-700">
                Предпочтительное время
              </label>
              <select
                id="preferredTime"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full px-3 py-3 border-2 border-mint-700 rounded-xl focus:border-mint-500 bg-transparent focus:outline-none transition-colors text-black"
              >
                <option value="">Выбрать</option>
                {timePreferences.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <motion.button
            type="submit"
            style={{
              background: `radial-gradient(
                212.58% 2646.98% at 35.86% 50%,
                #158875 0,
                #04ae78 48.96%,
                #016238 100%
              )`,
            }}
            className="appointment-child mt-6 w-full text-white font-semibold py-4 rounded-xl hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            Записаться
          </motion.button>
        </motion.form>
        <MessengerDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSelectMessenger={openMessenger}
        />


      </motion.div>
    </section>
  );
});

Appointment.displayName = 'Appointment';

export default Appointment;