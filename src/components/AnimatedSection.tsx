"use client";

import React, { ReactNode, useEffect, useRef } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wrapper component that triggers animations when section scrolls into view
 * Uses Intersection Observer to detect visibility and apply animations to h2 elements
 */
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect reduced motion: leave everything visible and still.
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Long stacked lists: fade each item in as it reaches the viewport,
    // instead of animating the whole list when the section first appears.
    const revealItems = Array.from(
      container.querySelectorAll<HTMLElement>(".reveal-on-scroll"),
    );
    revealItems.forEach((item) => {
      item.style.opacity = "0";
    });
    const revealObserver = new IntersectionObserver(
      (entries) => {
        // Items that come into view together (a row of cards) arrive in a
        // short stagger; items that scroll in one at a time have no delay.
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, order) => {
            const element = entry.target as HTMLElement;
            element.style.animation = `fadeInUp 0.7s ease-out ${order * 120}ms both`;
            // Once it has landed, drop the animation so it stops holding
            // `transform` (which would block hover effects on the card).
            element.addEventListener(
              "animationend",
              () => {
                element.style.animation = "";
                element.style.opacity = "";
              },
              { once: true },
            );
            revealObserver.unobserve(element);
          });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    revealItems.forEach((item) => revealObserver.observe(item));

    // Hide elements initially
    const h2Elements = container.querySelectorAll("h2");
    h2Elements.forEach((h2) => {
      (h2 as HTMLElement).style.opacity = "0";
    });

    const gridItems = container.querySelectorAll(".grid-animate > div");
    gridItems.forEach((item) => {
      (item as HTMLElement).style.opacity = "0";
    });

    const rotatedCards = container.querySelectorAll("[class*='rotate-']");
    rotatedCards.forEach((card) => {
      (card as HTMLElement).style.opacity = "0";
    });

    const carouselItems = container.querySelectorAll(".embla__slide");
    carouselItems.forEach((item) => {
      (item as HTMLElement).style.opacity = "0";
    });

    const imageCarouselItems = container.querySelectorAll(
      ".image-carousel .embla__slide",
    );
    imageCarouselItems.forEach((item) => {
      (item as HTMLElement).style.opacity = "0";
    });

    const tabbedCarouselItems = container.querySelectorAll(
      ".tabbed-carousel .embla__slide",
    );
    tabbedCarouselItems.forEach((item) => {
      (item as HTMLElement).style.opacity = "0";
    });

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate h2 elements
            const h2Elements = container.querySelectorAll("h2");
            h2Elements.forEach((h2) => {
              h2.classList.add("animate-fade-in-down");
            });

            // Animate grid items (for content columns)
            const gridItems = container.querySelectorAll(".grid-animate > div");
            gridItems.forEach((item, index) => {
              const delay = index * 100;
              const element = item as HTMLElement;
              element.style.animation = `slideInLeft 0.8s ease-out ${delay}ms both`;
            });

            // Animate rotated cards to straight (for content column cards)
            const rotatedCards =
              container.querySelectorAll("[class*='rotate-']");
            rotatedCards.forEach((card, index) => {
              const element = card as HTMLElement;
              const classString = element.className || "";
              const rotation =
                typeof classString === "string"
                  ? classString.match(/rotate-\[([^\]]+)\]/)?.[1] || "0deg"
                  : "0deg";
              element.style.setProperty("--rotation-angle", rotation);
              const delay = index * 150;
              element.style.animation = `rotateToStraight 0.8s ease-out ${delay}ms both`;
            });

            // Animate carousel items (embla slides)
            const carouselItems = container.querySelectorAll(".embla__slide");
            carouselItems.forEach((item, index) => {
              const delay = index * 80;
              const element = item as HTMLElement;
              element.style.animation = `slideInLeft 0.6s ease-out ${delay}ms both`;
            });

            // Stop observing after animation triggers
            observer.unobserve(container);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px",
      },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <style>{`
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out 0.1s both;
        }
      `}</style>
      {children}
    </div>
  );
};
