import React, { useRef, useState } from 'react';
import { Heart, Sparkles, Droplets, Smile, Star, Shield } from 'lucide-react';

import ServicesGrid from './ServicesGrid';


import { analytics } from '../../utils/analytics';

import Carousel3D from '../lightswind/Carousel-3d';
import { motion, useInView } from 'framer-motion';
import { Service } from '../../utils/servicesData';

type ServicesProps = {
  onSelectService: (service: string) => void;
};
const servicesData: Service[] = [
  {
    id: 'cleaning',
    icon: <Droplets size={32} style={{ color: '#38b2ac' }} />,
    title: 'Чистка лица',
    description:
      'Глубокое очищение кожи, удаление загрязнений и отмерших клеток для свежего и здорового вида.',
    price: 'от 1 800 ₽',
    duration: '60 мин',
    tags: ['очищение', 'поры', 'свежесть', 'все типы кожи'],
    contraindications: 'Избегать при воспалениях и открытых ранах.',
    aftercare: 'Использовать мягкие средства, избегать солнца 2 дня.',
  },
  {
    id: 'biorevitalization',
    icon: <Sparkles size={32} style={{ color: '#38b2ac' }} />,
    title: 'Биоревитализация',
    description:
      'Восстановление и омоложение кожи с помощью гиалуроновой кислоты, стимулируя естественные процессы обновления.',
    price: 'от 5 000 ₽',
    duration: '60 мин',
    tags: ['омоложение', 'увлажнение', 'морщины', 'сухая кожа', 'пигментация'],
    contraindications: 'Беременность, аллергия на компоненты.',
    aftercare: 'Избегать макияжа 24 часа, использовать солнцезащитный крем.',
  },
  {
    id: 'augmentation',
    icon: <Heart size={32} style={{ color: '#38b2ac' }} />,
    title: 'Аугментация губ',
    description:
      'Увеличение и моделирование губ с помощью филлеров для естественного результата.',
    price: 'от 7 500 ₽',
    duration: '45 мин',
    tags: ['увеличение', 'коррекция', 'губы'],
    contraindications: 'Воспаления, герпес в активной фазе.',
    aftercare: 'Избегать горячих процедур и массажа губ 3 дня.',
  },
  {
    id: 'massage',
    icon: <Smile size={32} style={{ color: '#38b2ac' }} />,
    title: 'Массаж лица',
    description:
      'Расслабляющий массаж для улучшения кровообращения, тонуса и общего состояния кожи лица.',
    price: 'от 1 800 ₽',
    duration: '50 мин',
    tags: ['расслабление', 'кровообращение', 'все типы кожи'],
    contraindications: 'Воспаления, кожные заболевания.',
    aftercare: 'Рекомендуется увлажнение кожи после процедуры.',
  },
  {
    id: 'rf_lifting',
    icon: <Star size={32} style={{ color: '#38b2ac' }} />,
    title: 'RF-лифтинг',
    description:
      'Безоперационная подтяжка кожи с помощью радиочастотных волн для повышения упругости и эластичности.',
    price: 'от 6 000 ₽',
    duration: '45 мин',
    tags: ['лифтинг', 'упругость', 'морщины', 'все типы кожи'],
    contraindications: 'Беременность, кардиостимулятор.',
    aftercare: 'Избегать солнца и сауны 1 неделю.',
  },
  {
    id: 'botulinotherapy',
    icon: <Heart size={32} style={{ color: '#38b2ac' }} />,
    title: 'Ботулинотерапия (1 ед.)',
    description:
      'Инъекции ботулотоксина для разглаживания морщин и профилактики их появления.',
    price: 'от 200 ₽',
    duration: '30 мин',
    tags: ['морщины', 'профилактика', 'коррекция'],
    contraindications: 'Беременность, неврологические заболевания.',
    aftercare: 'Избегать массажа и физических нагрузок 24 часа.',
  },
  {
    id: 'lipolytics_body',
    icon: <Star size={32} style={{ color: '#38b2ac' }} />,
    title: 'Липолитики по телу 5ml. (непрямые) _Estetic Form Lipo Stop_',
    description:
      'Инъекции для локального уменьшения жировых отложений на теле.',
    price: '2200 ₽',
    duration: '30 мин',
    tags: ['жировые отложения', 'коррекция тела'],
    contraindications: 'Беременность, воспаления в зоне инъекций.',
    aftercare: 'Избегать интенсивных нагрузок 3 дня.',
  },
  {
    id: 'lipolytics_face',
    icon: <Shield size={32} style={{ color: '#38b2ac' }} />,
    title: 'Липолитики по лицу 5ml. (непрямые) _Estetic Form Phyto Slim_',
    description:
      'Инъекции для коррекции контуров лица и уменьшения жировых отложений.',
    price: '1800 ₽',
    duration: '30 мин',
    tags: ['коррекция лица', 'жировые отложения'],
    contraindications: 'Воспаления, герпес в активной фазе.',
    aftercare: 'Избегать массажа лица 3 дня.',
  },
  {
    id: 'collagen_nithya',
    icon: <Star size={32} style={{ color: '#38b2ac' }} />,
    title: 'Коллаген Nithya',
    description:
      'Инъекции коллагена для повышения упругости и эластичности кожи.',
    price: '10 000 ₽',
    duration: '45 мин',
    tags: ['упругость', 'омоложение', 'морщины'],
    contraindications: 'Аллергия на компоненты.',
    aftercare: 'Избегать солнца и интенсивных нагрузок 3 дня.',
  },
  {
    id: 'mesotherapy',
    icon: <Droplets size={32} style={{ color: '#38b2ac' }} />,
    title: 'Мезотерапия (лицо, шея, зона декольте, кожа головы)',
    description:
      'Инъекции витаминов и препаратов для улучшения состояния кожи и волос.',
    price: 'от 1 000 ₽',
    duration: '60 мин',
    tags: ['улучшение кожи', 'волосы', 'питание'],
    contraindications: 'Беременность, воспаления.',
    aftercare: 'Избегать макияжа 24 часа.',
  },
  {
    id: 'fractional_mesotherapy',
    icon: <Star size={32} style={{ color: '#38b2ac' }} />,
    title: 'Фракционная мезотерапия',
    description:
      'Микроинъекции для стимуляции коллагена и улучшения текстуры кожи.',
    price: 'от 1 000 ₽',
    duration: '45 мин',
    tags: ['коллаген', 'текстура кожи', 'омоложение'],
    contraindications: 'Воспаления, аллергия.',
    aftercare: 'Избегать солнца 3 дня.',
  },
  {
    id: 'alginate_mask',
    icon: <Smile size={32} style={{ color: '#38b2ac' }} />,
    title: 'Альгинатная маска',
    description: 'Маска из альгината для глубокого увлажнения и питания кожи.',
    price: '700 ₽',
    duration: '30 мин',
    tags: ['увлажнение', 'питание', 'все типы кожи'],
    contraindications: 'Аллергия на компоненты.',
    aftercare: 'Использовать увлажняющие средства.',
  },
  {
    id: 'carboxytherapy',
    icon: <Droplets size={32} style={{ color: '#38b2ac' }} />,
    title: 'Карбокситерапия (Mesomatrix)',
    description:
      'Введение углекислого газа для улучшения обменных процессов и тонуса кожи.',
    price: '1500 ₽',
    duration: '45 мин',
    tags: ['обмен веществ', 'тонус кожи', 'омоложение'],
    contraindications: 'Беременность, воспаления.',
    aftercare: 'Избегать интенсивных нагрузок 2 дня.',
  },
  {
    id: 'cosmetic_peeling',
    icon: <Sparkles size={32} style={{ color: '#38b2ac' }} />,
    title:
      'Косметический пилинг (например, гликолевый, миндальный, BioRe Peel)',
    description:
      'Процедура для обновления кожи, устранения неровностей и пигментации.',
    price: 'от 1 800 ₽',
    duration: '30 мин',
    tags: ['обновление', 'пигментация', 'текстура кожи'],
    contraindications: 'Воспаления, открытые раны.',
    aftercare: 'Избегать солнца и скрабов 1 неделю.',
  },
  {
    id: 'cosmetologist_consultation',
    icon: <Star size={32} style={{ color: '#38b2ac' }} />,
    title: 'Консультация косметолога',
    description:
      'Профессиональная консультация по уходу за кожей и выбору процедур.',
    price: 'бесплатно',
    duration: '30 мин',
    tags: ['консультация', 'уход', 'подбор процедур'],
    contraindications: '',
    aftercare: '',
  },
  {
    id: 'combined_cleaning',
    icon: <Smile size={32} style={{ color: '#38b2ac' }} />,
    title: 'Комбинированная чистка лица',
    description:
      'Эффективная процедура, сочетающая механическую, ультразвуковую и аппаратную чистку, направленная на глубокое очищение пор, устранение загрязнений и улучшение состояния кожи.',
    price: 'от 2 500 ₽',
    duration: '60 мин',
    tags: ['очищение', 'поры', 'комбинированная', 'все типы кожи'],
    contraindications: 'Воспаления, открытые раны.',
    aftercare: 'Использовать мягкие средства, избегать солнца 2 дня.',
  },
];

const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [showAll, setShowAll] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleServiceClick = (serviceName: string) => {
    analytics.trackServiceInterest(serviceName);
  };

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-br from-mint-50 via-[#d9e7e2] to-brown-100"
      ref={ref}
    >
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Мои услуги</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Предлагаю полный спектр косметологических процедур с использованием современного оборудования и премиальных препаратов.
          </p>
        </motion.div>


        {!showAll ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ServicesGrid
                services={servicesData.slice(0, 3)}
                onServiceClick={(title) => {
                  handleServiceClick(title);
                  onSelectService(title);
                }}
                onClose={() => setShowAll(false)}
              />
            </motion.div>

            <div className="text-center mt-10">
              <motion.button
                onClick={() => setShowAll(true)}
                style={{
                  background: `radial-gradient(
                    212.58% 2646.98% at 35.86% 50%,
                    #158875 0,
                    #04ae78 48.96%,
                    #016238 100%
                  )`,
                }}
                className="inline-block text-white font-semibold py-3 px-6 rounded-xl hover:bg-mint-700 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Смотреть все
              </motion.button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Carousel3D
              services={servicesData}
              onServiceClick={(title) => {
                handleServiceClick(title);
                onSelectService(title);
              }}
              onClose={() => setShowAll(false)}
              autoRotate={true}
              rotateInterval={6000}
              cardHeight={420}
            />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default Services;
