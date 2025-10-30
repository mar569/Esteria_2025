
import { Link } from 'react-router-dom';
import { ArrowRight } from "lucide-react";

const ReviewsButton = () => (
    <div className="text-right mt-12">
        <Link
            to="/reviews"
            style={{
                background: `radial-gradient(
          212.58% 2646.98% at 35.86% 50%,
          #158875 0,
          #04ae78 48.96%,
          #016238 100%
        )`,
            }}
            className="inline-flex items-center justify-center px-4 py-3 text-white font-semibold rounded-full hover:from-mint-600 hover:to-mint-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
        >
            Смотреть все отзывы
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
        </Link>
    </div>
);

export default ReviewsButton;