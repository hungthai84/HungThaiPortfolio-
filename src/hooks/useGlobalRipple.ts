import { useEffect } from 'react';

export const useGlobalRipple = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const rippleEl = target.closest('.with-ripple') as HTMLElement;
      if (!rippleEl) return;

      const circle = document.createElement('span');
      const diameter = Math.max(rippleEl.clientWidth, rippleEl.clientHeight);
      const radius = diameter / 2;

      const rect = rippleEl.getBoundingClientRect();
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('js-ripple');

      const existingRipple = rippleEl.querySelector('.js-ripple');
      if (existingRipple) {
        existingRipple.remove();
      }

      rippleEl.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);
};
