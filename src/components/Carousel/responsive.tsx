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

export const getResponsiveItems = (): number => {
  if (typeof window === "undefined") return 2;
  const width = window.innerWidth;
  if (width >= 1024) return 2;
  if (width >= 640) return 2;
  return 1;
};

export const getCategoryResponsiveItems = (): number => {
  if (typeof window === "undefined") return 3;
  const width = window.innerWidth;
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
};
