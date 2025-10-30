import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/all';

gsap.registerPlugin(ScrollToPlugin);

export const smoothScrollTo = (targetSelector: string) => {
  const target = document.querySelector(targetSelector);
  if (!target) {
    console.error(`Element not found: ${targetSelector}`);
    return;
  }

  gsap.to(window, {
    scrollTo: { y: target, offsetY: 0 },
    duration: 1,
    ease: 'power2.inOut',
  });
};
