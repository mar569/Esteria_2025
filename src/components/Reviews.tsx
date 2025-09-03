"use client";

import { useState, useRef, useEffect } from "react";
import { Star } from "lucide-react";
import ReviewCard from "./animate/ReviewCard";
import Modal from "./lightswind/Card";
import SwipeReviews from "./lightswind/SwipeReviews";


const reviews = [
  {
    name: "Алина Овсянникова",
    service: "Пилинг",
    text: "Была на нескольких процедурах. Очень впечатлил энзимный пилинг. Эффект после процедуры потрясающий, выровнялся и осветился тон лица. Обязательо вернусь для повторной процедуры! Спасибо! 😊",
    rating: 5,
  },
  {
    name: "Анастасия Голеня",
    service: "Ультразвуковая чистка лица",
    text: "Была на процедуре ультразвуковой чистки лица, остались только положительные впечатления. Прекрасный мастер, уютная обстановка. Кожа после первой же процедуры выглядит шикарно. Рекомендую!",
    rating: 5,
  },
  {
    name: "Светлана Журавлёва",
    service: "Массаж лица, ботокс",
    text: "Была на процедурах в кабинете Эстерия у косметолога Марианны. Замечательный косметолог, волшебные руки. Проходила курс массажа, сделала ботокс. Результат на лицо. Обязатльно вернусь на другие процедуры, спасибо ❤️",
    rating: 5,
  },
  {
    name: "Светлана Врублевская",
    service: "Чистка лица",
    text: "Хожу не первый раз к косметологу - мастер золотые ручки, посоветует, подскажет, что и как лучше сделать. Атмосфера очень приятная, кабинет располагает к спокойствию. Всегда внимательная. Можно корректировать прием на удобное время . Очень благодарна за работу. Рекомендую всем . Отзывчивая и приятная девушка.🌺🌺🌺",
    rating: 5,
  },
  {
    name: "Анастасия Васильева",
    service: "Ультразвуковая чистка лица",
    text: "Все на высшем уровне! Доверять свою моську, только этому мастеру! Спасибо огромное 🙏 Жаль, что не встретила Вас раньше",
    rating: 5,
  },
  {
    name: "Елена Жилина",
    service: "Комбинованная чистка лица, пилинги, массаж лица",
    text: "Всем привет 👋 Сейчас прохожу курс уходовых процедур у Марианны. Мало того, что она привела моё лицо в порядок, еще помогла с подбором необходимых мне средств по уходу за кожей лица. Довольная её работой очень ! Всем рекомендую 👍",
    rating: 5,
  },
  {
    name: "Анна Акопян",
    service: "Липолитики по лицу, комбинованная чистка лица",
    text: "Большое спасибо косметологу Марианне. Была на чистке лица, очень довольна процедурой! Кожа будто задышала, свежая и сияющая 😊 Много лет делаю чистки (у других косметологов), сегодня первый раз процедура прошла очень комфортно, аккуратно и без боли. Результатом я довольна, теперь буду ходить только в Эстерию 😊",
    rating: 5,
  },
  {
    name: "Юра Михайлов",
    service: "Комбинованная чистка лица",
    text: "Регулярно хожу на процедуры в Эстерия. Очень доволен результатом, кожа преображается на глазах.",
    rating: 5,
  },
];

const Reviews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reviewsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isModalOpen && reviewsRef.current) {
      reviewsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isModalOpen]);

  const displayedReviews = reviews.slice(0, 2);

  return (
    <section
      id="reviews"
      className="py-20 bg-gradient-to-br from-mint-50 via-[#ccede3] to-brown-100"
      ref={reviewsRef}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Отзывы клиентов
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {displayedReviews.map((review, index) => (
            <ReviewCard key={review.name} review={review} index={index} />
          ))}
        </div>

        <div className="text-right mt-12">
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              background: `radial-gradient(
                    212.58% 2646.98% at 35.86% 50%,
                    #158875 0,
                    #04ae78 48.96%,
                    #016238 100%
                  )`,
            }}
            className="inline-block text-white font-semibold py-3 px-4 rounded-full shadow-lg transition-colors duration-300"
            aria-haspopup="dialog"
            aria-expanded={isModalOpen}
            aria-controls="reviews-modal"
          >
            Смотреть все отзывы
          </button>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 bg-white rounded-2xl p-3 shadow-lg">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-gray-800">5/5</div>
              <div className="text-gray-600 text-sm">Средняя оценка</div>
            </div>
            <div className="h-12 w-px bg-gray-200"></div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <SwipeReviews reviews={reviews} />
      </Modal>
    </section>
  );
};

export default Reviews;
