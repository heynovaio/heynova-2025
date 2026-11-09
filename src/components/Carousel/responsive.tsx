import { useSyncExternalStore } from "react";

export const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    slidesToSlide: 1,
    partialVisibilityGutter: 90,
  },
  tablet: {
    breakpoint: { max: 1023, min: 640 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 639, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};
export const category_responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1023, min: 640 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 639, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const subscribeToResize = (onChange: () => void) => {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
};

const responsiveItems = (width: number): number => (width >= 640 ? 2 : 1);

const categoryResponsiveItems = (width: number): number => {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
};

/**
 * Items visible per page in the standard carousels. The server has no window,
 * so it renders the desktop count; the first client render reuses that count
 * (keeping hydration in sync), then React re-renders with the real width and
 * keeps it current on resize.
 */
export const useResponsiveItems = (): number =>
  useSyncExternalStore(
    subscribeToResize,
    () => responsiveItems(window.innerWidth),
    () => 2,
  );

/** Items visible per page in the category-style carousels. See above. */
export const useCategoryResponsiveItems = (): number =>
  useSyncExternalStore(
    subscribeToResize,
    () => categoryResponsiveItems(window.innerWidth),
    () => 3,
  );
