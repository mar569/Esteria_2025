import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface UseParallaxScrollProps {
    containerRef: RefObject<HTMLElement>;
    options?: {
        defaultSpeed?: number;
        scale?: number;
        rotation?: number;
        yOffset?: number;
        blur?: number;
    };
}

export const useParallaxScroll = ({ containerRef, options = { defaultSpeed: 1 } }: UseParallaxScrollProps) => {
    const { defaultSpeed = 0.4, scale = 1, rotation = 0, yOffset = 0, blur = 0 } = options;

    useEffect(() => {
        if (typeof window === 'undefined' || !containerRef.current) return;

        const isMobile =
            ScrollTrigger.isTouch === 1 ||
            window.innerWidth <= 768 ||
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobile) return;

        const ctx = gsap.context(() => {
            if (!containerRef.current) return;
            const parallaxElements = containerRef.current.querySelectorAll('[data-parallax-speed]') as NodeListOf<HTMLElement>;

            parallaxElements.forEach((el) => {
                const speed = parseFloat(el.dataset.parallaxSpeed || defaultSpeed.toString()) || 1;
                const endY = window.innerHeight * speed;

                gsap.set(el, {
                    scale,
                    rotation,
                    y: yOffset,
                    filter: blur ? `blur(${blur}px)` : 'none',
                });

                gsap.fromTo(
                    el,
                    { y: yOffset },
                    {
                        y: -endY + yOffset,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'top top',
                            end: 'bottom top',
                            scrub: 0.5,
                            invalidateOnRefresh: true,
                        },
                    }
                );
            });
        }, containerRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [containerRef, options]);
};
