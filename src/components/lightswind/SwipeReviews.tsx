"use client";

import React, { useEffect, useRef } from "react";
import ReviewCard from "../animate/ReviewCard";

type Review = {
    name: string;
    service: string;
    text: string;
    rating: number;
};

type SwipeReviewsProps = {
    reviews: Review[];
    onCardClick?: (index: number) => void;
};

const SwipeReviews: React.FC<SwipeReviewsProps> = ({ reviews, onCardClick }) => {
    const cardStackRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLElement[]>([]);

    useEffect(() => {
        const cardStack = cardStackRef.current;
        if (!cardStack) return;
        cardsRef.current = Array.from(cardStack.querySelectorAll(".card"));

        let isSwiping = false;
        let startX = 0;
        let currentX = 0;
        let animationFrameId: number | null = null;

        const getDuration = () => 300;

        const getActiveCard = () => cardsRef.current[0];

        const updatePositions = () => {
            cardsRef.current.forEach((card, i) => {
                const offset = i + 1;
                card.style.zIndex = `${100 - offset}`;
                card.style.transform = `perspective(700px) translateZ(${-12 * offset}px) translateY(${7 * offset}px) translateX(0px) rotateY(0deg)`;
                card.style.opacity = `1`;
            });
        };

        const applySwipeStyles = (deltaX: number) => {
            const card = getActiveCard();
            if (!card) return;
            const rotate = deltaX * 0.2;
            const opacity = 1 - Math.min(Math.abs(deltaX) / 100, 1) * 0.75;
            card.style.transform = `perspective(700px) translateZ(-12px) translateY(7px) translateX(${deltaX}px) rotateY(${rotate}deg)`;
            card.style.opacity = `${opacity}`;
        };

        const handleStart = (clientX: number) => {
            if (isSwiping) return;
            isSwiping = true;
            startX = currentX = clientX;
            const card = getActiveCard();
            if (card) card.style.transition = "none";
        };

        const handleMove = (clientX: number) => {
            if (!isSwiping) return;
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(() => {
                currentX = clientX;
                const deltaX = currentX - startX;
                applySwipeStyles(deltaX);
                if (Math.abs(deltaX) > 50) handleEnd();
            });
        };

        const handleEnd = () => {
            if (!isSwiping) return;
            if (animationFrameId) cancelAnimationFrame(animationFrameId);

            const deltaX = currentX - startX;
            const threshold = 50;
            const duration = getDuration();
            const card = getActiveCard();

            if (card) {
                card.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;

                if (Math.abs(deltaX) > threshold) {
                    const direction = Math.sign(deltaX);
                    card.style.transform = `perspective(700px) translateZ(-12px) translateY(7px) translateX(${direction * 300}px) rotateY(${direction * 20}deg)`;

                    setTimeout(() => {
                        card.style.transform = `perspective(700px) translateZ(-12px) translateY(7px) translateX(${direction * 300}px) rotateY(${-direction * 20}deg)`;
                    }, duration / 2);

                    setTimeout(() => {
                        cardsRef.current = [...cardsRef.current.slice(1), card];
                        updatePositions();
                    }, duration);
                } else {
                    applySwipeStyles(0);
                }
            }

            isSwiping = false;
            startX = currentX = 0;
        };

        cardStack.addEventListener("pointerdown", (e) => handleStart(e.clientX));
        cardStack.addEventListener("pointermove", (e) => handleMove(e.clientX));
        cardStack.addEventListener("pointerup", handleEnd);
        cardStack.addEventListener("pointerleave", handleEnd);

        updatePositions();

        return () => {
            if (!cardStack) return;
            cardStack.removeEventListener("pointerdown", (e) => handleStart(e.clientX));
            cardStack.removeEventListener("pointermove", (e) => handleMove(e.clientX));
            cardStack.removeEventListener("pointerup", handleEnd);
            cardStack.removeEventListener("pointerleave", handleEnd);
        };
    }, [reviews]);

    return (
        <section
            ref={cardStackRef}
            className="relative w-96 h-[360px] grid place-content-center touch-none select-none"
        >
            {reviews.map((review, index) => (
                <article
                    key={index}
                    onClick={() => onCardClick?.(index)}
                    className="card absolute inset-4 rounded-xl border border-gray-300 shadow-lg cursor-grab bg-white"
                    style={{ touchAction: "none" }}
                >
                    <ReviewCard review={review} index={index} />
                </article>
            ))}
        </section>
    );
};

export default SwipeReviews;
