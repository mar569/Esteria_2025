import { useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import place from '../assets/place.png';


const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[#47c494] via-[#9ce0cb] to-brown-100 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#99dac1] animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-mint-200 animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 rounded-full bg-[#E6BE8A] animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-4000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="text-mint-500" size={24} />
              <span className="text-mint-600 font-medium uppercase tracking-wider text-sm">
                Косметология
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Красота и уход
              <span className="block text-mint-600">для вашей кожи</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Профессиональные косметологические процедуры в Шлиссельбурге.
              Массажи (PlasticLift), чистки лица, биоревитализация, аугментация губ и многое другое — всё в уютной и комфортной обстановке.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#appointment"
                style={{
                  background: `radial-gradient(
      212.58% 2646.98% at 35.86% 50%,
      #158875 0,
      #04ae78 48.96%,
      #016238 100%
    )`,
                }}
                className="inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-full hover:from-mint-600 hover:to-mint-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
              >
                Записаться на прием
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-mint-700 text-mint-600 font-semibold rounded-full hover:bg-mint-50 transition-all duration-300"
              >
                Мои услуги
              </a>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-mint-400/20 to-beige-400/20 rounded-3xl blur-3xl"></div>
              <img
                src={place}
                alt="Косметологические процедуры"
                className="relative w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80  to-transparent rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-mint-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-mint-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;