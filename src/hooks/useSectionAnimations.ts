import { gsap } from 'gsap';
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import { useEffect, RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface UseSectionAnimationsProps {
  heroRef: RefObject<HTMLElement>;
  aboutRef: RefObject<HTMLElement>;
  servicesRef: RefObject<HTMLElement>;
  whymeRef: RefObject<HTMLElement>;
  contactRef: RefObject<HTMLElement>;
  galleryRef: RefObject<HTMLDivElement>;
  reviewsRef: RefObject<HTMLElement>;
  appointmentRef: RefObject<HTMLElement>;
  blogRef: RefObject<HTMLElement>;
  footerRef: RefObject<HTMLElement>;
}

export const useSectionAnimations = ({
  heroRef,
  aboutRef,
  servicesRef,
  whymeRef,
  contactRef,
  galleryRef,
  reviewsRef,
  appointmentRef,
  blogRef,
  footerRef,
}: UseSectionAnimationsProps) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,resize,orientationchange',
      limitCallbacks: true,
    });

    const animateSection = (
      ref: RefObject<HTMLElement>,
      fromProps: any,
      toProps: any,
      staggerChildren: boolean = false,
      start: string = 'top 85%',
      end: string = 'bottom 15%',
      customEase: string = 'power2.out'
    ) => {
      if (ref?.current) {
        gsap.set(ref.current, fromProps);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start,
            end,
            scrub: 2.5,
            toggleActions: 'play none none none',
            fastScrollEnd: true,
            invalidateOnRefresh: true,
            preventOverlaps: true,
            markers: false,
          },
        });

        tl.to(ref.current, {
          ...toProps,
          duration: 1.5,
          ease: customEase,
        });

        if (staggerChildren) {
          const children = ref.current.querySelectorAll('.animate-child');
          if (children.length) {
            tl.to(
              children,
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.5,
                stagger: 0.2,
                ease: customEase,
              },
              '-=0.5'
            );
          }
        }
      }
    };

    if (heroRef.current) {
      gsap.set('.hero-bg', { y: 0, opacity: 1 });
      gsap.set('.hero-title', { y: 0, opacity: 1 });

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2.5,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      });

      heroTl
        .to('.hero-bg', { y: '30%', opacity: 0.8, ease: 'power2.out' })
        .to('.hero-title', { y: '-60%', opacity: 0, ease: 'power2.out' }, 0); // Синхронизировано

      gsap.to('.hero-bg', {
        opacity: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 50%',
          end: 'top 20%',
          scrub: 2.5,
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true,
        },
      });
    }

    animateSection(
      aboutRef,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, scale: 1 },
      true,
      'top 90%',
      'bottom 15%',
      'power3.out'
    );
    animateSection(servicesRef, { x: 50, opacity: 0 }, { x: -5, opacity: 1 });
    animateSection(whymeRef, { x: -20, opacity: 0 }, { x: 5, opacity: 1 });
    animateSection(contactRef, { x: -40, opacity: 0 }, { x: 10, opacity: 1 });
    animateSection(galleryRef, { x: -40, opacity: 0 }, { x: 10, opacity: 1 });
    animateSection(reviewsRef, { x: -50, opacity: 0 }, { x: 10, opacity: 1 });
    animateSection(
      appointmentRef,
      { x: 100, opacity: 0 },
      { x: -10, opacity: 1 }
    );
    animateSection(
      blogRef,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1 }
    );

    if (contactRef.current) {
      gsap.to(contactRef.current, {
        backgroundPosition: '50% 100%',
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top right',
          end: 'bottom top',
          scrub: 2.5,
          invalidateOnRefresh: true,
        },
      });
    }

    if (footerRef.current) {
      gsap.set(footerRef.current, { zIndex: 10, y: -100, opacity: 0 });
      gsap.to(footerRef.current, {
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',
          end: 'top 20%',
          scrub: 2.5,
          invalidateOnRefresh: true,
        },
      });
    }

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
};
