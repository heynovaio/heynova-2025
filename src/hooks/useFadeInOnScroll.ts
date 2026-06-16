// /hooks/useFadeInOnScroll.ts - copied from Kirsten's claude code to animate the fade in thats shown in the first example
import { useEffect } from "react";

export const useFadeInOnScroll = <T extends HTMLElement>(
  ref: React.RefObject<T | null>,
) => {
  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const items: Element[] = [
      ...(container.classList.contains("fade-in") ? [container] : []),
      ...Array.from(container.querySelectorAll(".fade-in")),
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            el.classList.add("is-visible");
          } else {
            el.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    items.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ref]);
};
