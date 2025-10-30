import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { articles } from '../utils/articlesData';
import ArticleCard from './animate/ArticleCard';
import SEOHead from '../components/SEOHead';

const blogVariants = {
  hidden: {}, visible: { transition: { staggerChildren: 0.2 } },
};

const Blog = forwardRef<HTMLElement>((props, ref) => {
  return (
    <>
      <SEOHead
        title="Блог о косметологии - Esteria"
        description="Статьи и советы по косметологии, уходу за кожей и процедурам в Esteria."  // Из seoData['/blog']
        url="https://esteria-cosmo.ru/blog"
      />
      <section id="blog" className="py-10 relative" ref={ref} data-parallax-speed="0.3">
        <motion.div
          className="container mx-auto px-4"
          variants={blogVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl lg:text-4xl font-bold text-gray-200 mb-6 bg-gradient-to-br from-slate-200 to-slate-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Полезные статьи
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
});

Blog.displayName = 'Blog';

export default Blog;