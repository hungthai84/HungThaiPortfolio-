import { useEffect, RefObject } from 'react';

export function useScrollPosition(
  scrollContainerRef: RefObject<HTMLElement | null>,
  activePage: string
) {
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        sessionStorage.setItem(`scroll-position-${activePage}`, scrollContainerRef.current.scrollTop.toString());
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activePage, scrollContainerRef]);

  useEffect(() => {
    const restoreScroll = () => {
      const savedPosition = sessionStorage.getItem(`scroll-position-${activePage}`);
      if (scrollContainerRef.current) {
        if (savedPosition !== null) {
          scrollContainerRef.current.scrollTop = parseInt(savedPosition, 10);
        } else {
          scrollContainerRef.current.scrollTop = 0;
        }
      }
      // Keep body scroll at 0 just in case
      window.scrollTo({ top: 0, behavior: "instant" });
    };

    restoreScroll();
    
    // Try multiple times to ensure it restores after dynamic content renders (like React lazy loading or staggered animations)
    const timer1 = setTimeout(restoreScroll, 20);
    const timer2 = setTimeout(restoreScroll, 100);
    const timer3 = setTimeout(restoreScroll, 300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [activePage, scrollContainerRef]);
}
