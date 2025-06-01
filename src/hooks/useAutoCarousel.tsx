
import { useCallback, useEffect, useRef } from 'react';
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';

interface UseAutoCarouselOptions {
  delay?: number;
  stopOnInteraction?: boolean;
}

export const useAutoCarousel = (
  options: UseAutoCarouselOptions = {}
) => {
  const { delay = 3000, stopOnInteraction = true } = options;
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    direction: 'rtl',
    slidesToScroll: 1
  });
  
  const autoplayRef = useRef<NodeJS.Timeout>();

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = undefined;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (!emblaApi) return;
    
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, delay);
  }, [emblaApi, delay, stopAutoplay]);

  const onSelect = useCallback(() => {
    if (!emblaApi || !stopOnInteraction) return;
    startAutoplay();
  }, [emblaApi, stopOnInteraction, startAutoplay]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', onSelect);
    startAutoplay();

    return () => {
      stopAutoplay();
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect, startAutoplay, stopAutoplay]);

  useEffect(() => {
    return () => stopAutoplay();
  }, [stopAutoplay]);

  return {
    emblaRef,
    emblaApi,
    stopAutoplay,
    startAutoplay
  };
};
