"use client";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { useCallback, useRef, useEffect } from "react";

/**
 * Carousel Button - Intended for carousel slide navigation
 *
 * @see For implementation example, see the handleSlideChange function in ./index (TabbedCarousel component)
 */

interface CarouselButtonProps {
  currentSlide: number;
  totalSlides: number;
  onSlideChange: (direction: "prev" | "next") => void;
  styling?: string;
}

export const CarouselButton = ({
  currentSlide,
  totalSlides,
  onSlideChange,
  styling,
}: CarouselButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (
        !containerRef.current ||
        !containerRef.current.contains(document.activeElement)
      )
        return;

      if (event.key === "ArrowLeft") {
        onSlideChange("prev");
      } else if (event.key === "ArrowRight") {
        onSlideChange("next");
      }
    },
    [onSlideChange]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <style>{`
        @keyframes slideCardIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .carousel-button {
          transition: all 0.2s ease-out;
        }
        .carousel-button:focus {
          outline: 2px solid #97e1e5;
          outline-offset: 2px;
          background-color: rgba(151, 225, 229, 0.1);
        }
        .carousel-button:active {
          animation: slideCardIn 0.3s ease-out;
        }
        .carousel-button:disabled {
          cursor: not-allowed;
          opacity: 0.4;
        }
      `}</style>
      <div
        className={`flex items-center gap-2 ${styling}`}
        ref={containerRef}
        role="group"
        aria-label="Carousel navigation"
      >
        <button
          onClick={() => currentSlide > 1 && onSlideChange("prev")}
          aria-label={`Previous slide (${currentSlide - 1} of ${totalSlides})`}
          disabled={currentSlide === 1}
          className="carousel-button rounded-full p-2 border-aqua border-2 text-aqua hover:bg-aqua/10"
        >
          <HiOutlineArrowLongRight className="h-5 w-5 rotate-180" />
        </button>
        <span aria-live="polite" aria-atomic="true" className="sr-only">
          Slide {currentSlide} of {totalSlides}
        </span>
        <span className="text-sm text-aqua/70 min-w-[3rem] text-center" aria-hidden="true">
          {currentSlide}/{totalSlides}
        </span>
        <button
          onClick={() => currentSlide < totalSlides && onSlideChange("next")}
          aria-label={`Next slide (${currentSlide + 1} of ${totalSlides})`}
          disabled={currentSlide === totalSlides}
          className="carousel-button rounded-full p-2 border-aqua border-2 text-aqua hover:bg-aqua/10"
        >
          <HiOutlineArrowLongRight className="h-5 w-5 stroke-2" />
        </button>
      </div>
    </>
  );
};
