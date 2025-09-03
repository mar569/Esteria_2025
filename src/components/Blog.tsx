
import { articles } from '../utils/articlesData';
import ArticleCard from './animate/ArticleCard';

const Blog = () => {
  return (
    <section id="blog" className="py-20 bg-gradient-to-t from-[#bfecde] via-brown-100 to-mint-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Полезные статьи</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Экспертные советы и рекомендации от наших специалистов
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
