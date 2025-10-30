import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { articles } from '../utils/articlesData';
import ArticleCard from './animate/ArticleCard';
import SEOHead from '../components/SEOHead';
import { advancedVariants, commonVariants } from '../utils/animations';


const Blog = forwardRef<HTMLElement>((_, ref) => {
  return (
    <>
      <SEOHead
        title="Блог о косметологии - Esteria"
        description="Статьи и советы по косметологии, уходу за кожей и процедурам в Esteria."
        url="https://esteria-cosmo.ru/blog"
      />
      <section id="blog" className="py-10 relative" ref={ref} data-parallax-speed="0.3">
        <motion.div
          className="container mx-auto px-4"
          variants={commonVariants.staggerContainer} // Используем staggerContainer для последовательной анимации дочерних элементов
          initial="hidden"
          animate="visible"
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl lg:text-4xl font-bold text-gray-200 mb-6 bg-gradient-to-br from-slate-200 to-slate-400 bg-clip-text text-transparent"
              variants={commonVariants.fadeIn} // Используем fadeIn для заголовка
              initial="hidden"
              animate="visible"
            >
              Полезные статьи
            </motion.h2>
          </div>

          <motion.div
            className="grid lg:grid-cols-3 gap-8"
            variants={commonVariants.staggerContainer} // Дополнительный stagger для сетки статей
            initial="hidden"
            animate="visible"
          >
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                variants={advancedVariants.bounceIn} // Используем bounceIn для карточек статей для более динамичной анимации
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }} // Небольшая задержка для каждой карточки
              >
                <ArticleCard article={article} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
});

Blog.displayName = 'Blog';

export default Blog;
