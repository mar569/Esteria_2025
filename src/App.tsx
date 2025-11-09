import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import PageLayout from './components/PageLayout';

import SEOHead from './components/SEOHead';
import NotFoundPage from './components/NotFoundPage';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import AllReviewsPage from './pages/AllReviewsPage';
import { ServiceProvider } from './components/context/ServiceContext';
import ErrorBoundary from './ErrorBoundary';

const Blog = lazy(() => import('./components/Blog'));

function App() {
  const location = useLocation();
  const hideHeader = location.pathname !== '/';

  const seoData = {
    '/': {
      title: 'Косметология Эстерия | Косметологический кабинет в Шлиссельбурге',
      description: 'Косметология Эстерия: биоревитализация, аугментация губ, чистка лица, массаж лица, липолитики по телу и лицу, ботулинотерапия, коллаген и другие процедуры.',
      url: 'https://esteriacosmo.ru',
      iconPath: '/favicon.ico',
    },

    '/reviews': {
      title: 'Все отзывы - Эстерия',
      description: 'Полный список отзывов клиентов Esteria.',
      url: 'https://esteriacosmo.ru/reviews',
      iconPath: '/favicon.ico',
    },
    '/blog': {
      title: 'Блог о косметологии - Эстерия',
      description: 'Статьи и советы по косметологии, уходу за кожей и процедурам в Esteria.',
      url: 'https://esteriacosmo.ru/blog',
      iconPath: '/favicon.ico',
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
              iconPath={currentSEO.iconPath} // Передача favicon
            />
            <Suspense fallback={<div className="spinner_suspense"></div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/reviews" element={<AllReviewsPage />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<ArticlePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </PageLayout>
        </ServiceProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;