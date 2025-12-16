
import { Routes, Route, useLocation } from 'react-router-dom';
import PageLayout from './components/PageLayout';
import SEOHead from './components/SEOHead';
import NotFoundPage from './components/NotFoundPage';
import AllReviewsPage from './pages/AllReviewsPage';
import { ServiceProvider } from './components/context/ServiceContext';
import ErrorBoundary from './ErrorBoundary';

import Blog from './components/Blog';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';

function App() {
  const location = useLocation();
  const hideHeader = location.pathname !== '/';

  const seoData = {
    '/': {
      title: 'Косметология в Шлиссельбурге | Косметология Эстерия в Шлиссельбурге',
      description: 'Косметология Эстерия - биоревитализация, аугментация губ, чистка лица, массаж лица, липолитики по телу и лицу, ботулинотерапия, коллаген и другие процедуры в Шлиссельбурге.',
      url: 'https://esteriacosmo.ru',
    },
    '/reviews': {
      title: 'Все отзывы - Эстерия',
      description: 'Полный список отзывов клиентов Эстерия.',
      url: 'https://esteriacosmo.ru/reviews',
    },
    '/blog': {
      title: 'Блог о косметологии - Эстерия',
      description: 'Статьи и советы по косметологии, уходу за кожей и процедурам в Эстерия.',
      url: 'https://esteriacosmo.ru/blog',
    },
  };

  const currentSEO = seoData[location.pathname as keyof typeof seoData] || seoData['/'];

  return (
    <div className="background-wrapper min-h-screen parallax-container">
      <ErrorBoundary>
        <ServiceProvider>
          <PageLayout hideHeader={hideHeader}>
            <SEOHead
              title={currentSEO.title}
              description={currentSEO.description}
              url={currentSEO.url}
            />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/reviews" element={<AllReviewsPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<ArticlePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </PageLayout>
        </ServiceProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;