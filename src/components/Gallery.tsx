import { useState, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Maximize2,
  Play,
  Phone,
} from 'lucide-react';
import { motion, useInView, Variants } from 'framer-motion';
import interior_1 from '../assets/interior/interior-1.jpg';
import interior_2 from '../assets/interior/interior-2.jpg';
import interior_3 from '../assets/interior/interior-3.jpg';
import interior_4 from '../assets/interior/interior-4.jpg';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: 'interior' | 'equipment' | 'procedures' | 'reception';
  title: string;
  description: string;
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96], // cubic-bezier easing
    },
  }),
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const images: GalleryImage[] = [
    {
      id: 1,
      src: interior_2,
      alt: 'Современный кабинет косметологии с креслом',
      category: 'interior',
      title: 'Современный интерьер',
      description: 'Уютный и современный кабинет косметологии',
    },
    {
      id: 2,
      src: interior_1,
      alt: 'Косметологический кабинет с креслом и лампой',
      category: 'interior',
      title: 'Кабинет с лампой',
      description: 'Комфортное рабочее место косметолога',
    },
    {
      id: 3,
      src: interior_2,
      alt: 'Косметологические приборы на столе',
      category: 'equipment',
      title: 'Приборы',
      description: 'Современные приборы для ухода за кожей',
    },
    {
      id: 4,
      src: interior_3,
      alt: 'Косметологический кабинет с креслом и растениями',
      category: 'interior',
      title: 'Кабинет с растениями',
      description: 'Приятная атмосфера для клиентов',
    },
    {
      id: 5,
      src: interior_4,
      alt: 'Косметологический кабинет с креслом и растениями',
      category: 'interior',
      title: 'Кабинет с растениями',
      description: 'Приятная атмосфера для клиентов',
    },
    {
      id: 6,
      src: interior_2,
      alt: 'Консультационная зона',
      category: 'interior',
      title: 'Консультационная зона',
      description: 'Место для предварительных консультаций',
    },
  ];

  const categories = [
    { id: 'all', name: 'Все фото', count: images.length },
    {
      id: 'interior',
      name: 'Интерьер',
      count: images.filter((img) => img.category === 'interior').length,
    },
    {
      id: 'procedures',
      name: 'Процедуры',
      count: images.filter((img) => img.category === 'procedures').length,
    },
  ];

  const filteredImages =
    activeCategory === 'all'
      ? images
      : images.filter((img) => img.category === activeCategory);

  const openLightbox = (imageId: number) => {
    setSelectedImage(imageId);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;

    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage
    );
    let newIndex;

    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedImage(filteredImages[newIndex].id);
  };

  const selectedImageData = selectedImage
    ? images.find((img) => img.id === selectedImage)
    : null;

  return (
    <section
      id="gallery"
      className="py-20 bg-gradient-to-br from-mint-50 via-[#bfecde] to-brown-100"
      ref={containerRef}
    >
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Заголовок */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUpVariants}
          custom={0}
        >
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Camera className="text-mint-600" size={32} />
            <span className="text-mint-700 font-medium uppercase tracking-wider text-sm">
              Наша клиника
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Фотографии кабинета
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Познакомьтесь с моим современным кабинетом, где каждая деталь
            продумана для вашего комфорта и безопасности
          </p>
        </motion.div>

        {/* Категории */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={fadeUpVariants}
          custom={1}
        >
          {categories.map((category, i) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${activeCategory === category.id
                ? 'bg-gradient-to-r from-mint-600 to-mint-700 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-mint-50 border-2 border-gray-200 hover:border-mint-300'
                }`}
              variants={fadeUpVariants}
              custom={i + 2}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
              <span className="ml-2 text-xs opacity-75">({category.count})</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Галерея */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={fadeUpVariants}
          custom={categories.length + 2}
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${index % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              onClick={() => openLightbox(image.id)}
              variants={fadeUpVariants}
              custom={index + categories.length + 3}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div
                className={`relative overflow-hidden ${index % 3 === 0 ? 'h-80 lg:h-96' : 'h-48 lg:h-64'
                  }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-bold text-lg mb-2">
                      {image.title}
                    </h3>
                    <p className="text-white/90 text-sm">{image.description}</p>
                  </div>

                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Maximize2 className="text-white" size={20} />
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {categories.find((cat) => cat.id === image.category)?.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Виртуальная экскурсия */}
        <motion.div
          className="mt-16 text-center"
          variants={fadeUpVariants}
          custom={filteredImages.length + categories.length + 3}
        >
          <div className="bg-gradient-to-r from-mint-100 to-beige-100 rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Play className="text-mint-600" size={32} />
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Виртуальная экскурсия
              </h3>
            </div>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Хотите увидеть кабинет вживую? Приходите на бесплатную консультацию
              и познакомьтесь со мной
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+79657887750"
                className="inline-flex gap-2 items-center justify-center px-8 py-4 border-2 border-mint-600 text-mint-700 font-semibold rounded-full hover:bg-mint-50 transition-all duration-300"
              >
                <Phone size={18} />
                Позвонить сейчас
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Lightbox */}
      {selectedImage && selectedImageData && (
        <motion.div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key="lightbox"
        >
          <div className="relative max-w-6xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Закрыть"
            >
              <X size={24} />
            </button>


            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Предыдущее изображение"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Следующее изображение"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image */}
            <div className="relative">
              <img
                src={selectedImageData.src}
                alt={selectedImageData.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl"
              />

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
                <h3 className="text-white font-bold text-xl mb-2">
                  {selectedImageData.title}
                </h3>
                <p className="text-white/90">{selectedImageData.description}</p>
              </div>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm select-none">
              {filteredImages.findIndex((img) => img.id === selectedImage) + 1} /{' '}
              {filteredImages.length}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Gallery;
