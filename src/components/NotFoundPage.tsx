
import React from 'react';
import { Link } from 'react-router-dom';
import cat from '../assets/cat.jpg';
import { Helmet } from '@dr.pogodin/react-helmet';


const NotFoundPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>404 - Страница не найдена | Esteria</title>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="googlebot" content="noindex, nofollow" />
                <meta name="description" content="Страница не найдена. Вернитесь на главную страницу сайта Esteria." />
                <meta property="og:title" content="404 - Страница не найдена" />
                <meta property="og:description" content="Похоже, вы зашли не туда. Но мы скоро это починим!" />
                <meta property="og:image" content={cat} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="website" />
            </Helmet>

            <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d0d0d] text-white px-4 text-center overflow-hidden font-montserrat p-20">
                <div>
                    <h2 className="text-4xl font-extrabold uppercase mb-2 opacity-0 fadeInUp animation-delay-500">
                        Страница не работает
                    </h2>
                </div>
                <div className="mt-10 opacity-0 fadeIn animation-delay-2000">
                    <img
                        src={cat}
                        alt="Not Found"
                        className="max-w-xs drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] mx-auto rounded-xl"
                    />
                    <div className="max-w-3xl p-5 fadeIn">
                        <h1
                            className="text-[100px] md:text-[140px] font-black tracking-widest mb-3 select-none glitch"
                            style={{ animationFillMode: 'forwards' }}
                        >
                            404
                        </h1>
                        <p className="text-lg text-gray-400 mb-8 opacity-0 fadeInUp animation-delay-1000 max-w-md mx-auto">
                            Похоже, вы зашли не туда.
                        </p>
                        <Link
                            to="/"
                            className="inline-block px-7 py-3 bg-white text-[#0d0d0d] font-semibold rounded-xl transition transform hover:scale-105 hover:bg-gray-100 opacity-0 fadeInUp animation-delay-1500"
                        >
                            На главную
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;