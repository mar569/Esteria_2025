"use client";

import React, { useRef } from "react";
import { Star } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { FaVk } from "react-icons/fa";

type Review = {
    name: string;
    service: string;
    text: string;
    rating: number;
};

type ReviewCardProps = {
    review: Review;
    index: number;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden flex flex-col"
            style={{ minHeight: "300px" }}
        >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-b from-mint-200 to-beige-200 rounded-bl-3xl opacity-50"></div>

            <div className="relative flex-grow flex flex-col">
                <FaVk className="text-blue-400 mb-4" size={32} />

                <p className="text-gray-700 mb-6 leading-relaxed text-lg flex-grow">
                    "{review.text}"
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-4">
                        <div>
                            <h4 className="font-bold text-gray-800">{review.name}</h4>
                            <p className="text-gray-500 text-sm">{review.service}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-1">
                        {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ReviewCard;
