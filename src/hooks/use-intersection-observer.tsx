import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean;
}

/**
 * Simple Intersection Observer hook for scroll-triggered animations
 * Lightweight alternative to Framer Motion for scroll detection
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    once = true,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // If once is true, stop observing after first intersection
          if (once && currentRef) {
            observer.unobserve(currentRef);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}
