import { useEffect } from 'react';

export const usePreventScroll = (isOpen: boolean) => {
  useEffect(() => {
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('touchmove', preventScroll, { passive: false });
      document.addEventListener('wheel', preventScroll, { passive: false });
    } else {
      document.body.style.overflow = 'unset';
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('wheel', preventScroll);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('wheel', preventScroll);
    };
  }, [isOpen]);
};
