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
      end: string = 'bottom 15%'
    ) => {
      if (ref?.current) {
        gsap.set(ref.current, fromProps);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start,
            end,
            scrub: 1.5,
            toggleActions: 'play none none none',
            fastScrollEnd: true,
            invalidateOnRefresh: true,
            preventOverlaps: true,
          },
        });

        tl.to(ref.current, {
          ...toProps,
          duration: 1.2,
          ease: 'power2.out',
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
                duration: 1.2,
                stagger: 0.15,
                ease: 'power2.out',
              },
              '-=0.5'
            );
          }
        }
      }
    };

    if (heroRef.current) {
      gsap.set('.hero-bg', { y: 0, opacity: 1 });
      gsap.to('.hero-bg', {
        y: '30%',
        opacity: 0.8,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });

      gsap.to('.hero-title', {
        y: '-60%',
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });

      gsap.to('.hero-bg', {
        opacity: 0,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 50%',
          end: 'top 20%',
          scrub: 1.5,
          toggleActions: 'play none none reverse',
        },
      });
    }

    animateSection(aboutRef, { y: 150 }, { y: 0 }, true);
    animateSection(servicesRef, { x: 50 }, { x: -5 });
    animateSection(whymeRef, { x: -20 }, { x: 5 });
    animateSection(contactRef, { x: -40 }, { x: 10 });
    animateSection(galleryRef, { x: -40 }, { x: 10 });
    animateSection(reviewsRef, { x: -50 }, { x: 10 });
    animateSection(appointmentRef, { x: 100 }, { x: -10 });
    animateSection(blogRef, { scale: 0.9 }, { scale: 1 });

    if (contactRef.current) {
      gsap.to(contactRef.current, {
        backgroundPosition: '50% 100%',
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top right',
          end: 'bottom top',
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });
    }

    if (footerRef.current) {
      gsap.set(footerRef.current, { zIndex: 10 });
      gsap.fromTo(
        footerRef.current,
        { y: -100 },
        {
          y: 0,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom',
            end: 'top 20%',
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        }
      );
    }

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
};
