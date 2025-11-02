import { forwardRef } from "react";
import { reviews } from "../../utils/reviewsData";
import ReviewsList from "./ReviewsList";
import ReviewsButton from "./ReviewsButton";
import ReviewsHeader from "./ReviewsHeader";
import { motion } from "framer-motion";

const Reviews = forwardRef<HTMLElement>((_, ref) => {
  const displayedReviews = reviews.slice(0, 2);

  return (
    <section
      id="reviews"
      className="py-16 relative"
      ref={ref}
      data-parallax-speed="0.25"
    >
      <motion.div
        className="container mx-auto px-4 animate-on-scroll"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl lg:text-4xl font-bold text-gray-200 mb-6 bg-gradient-to-br from-slate-200 to-slate-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Отзывы клиентов
          </motion.h2>
        </div>

        <ReviewsList reviews={displayedReviews} />
        <ReviewsButton />
        <ReviewsHeader />
      </motion.div>
    </section>
  );
});

Reviews.displayName = "Reviews";

export default Reviews;