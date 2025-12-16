import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import PageLayout from './components/PageLayout';
import SEOHead from './components/SEOHead';
import NotFoundPage from './components/NotFoundPage';
import AllReviewsPage from './pages/AllReviewsPage';
import { ServiceProvider } from './components/context/ServiceContext';
import ErrorBoundary from './ErrorBoundary';
import ArticlePage from './pages/ArticlePage';

const Blog = lazy(() => import('./components/Blog'));
const HomePage = lazy(() => import('./pages/HomePage'));

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
          <Suspense fallback={
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>

              <div className="loader">
                <div className="square" id="sq1"></div>
                <div className="square" id="sq2"></div>
                <div className="square" id="sq3"></div>
                <div className="square" id="sq4"></div>
                <div className="square" id="sq5"></div>
                <div className="square" id="sq6"></div>
                <div className="square" id="sq7"></div>
                <div className="square" id="sq8"></div>
                <div className="square" id="sq9"></div>
              </div>
            </div>
          }>
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
          </Suspense>
        </ServiceProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
