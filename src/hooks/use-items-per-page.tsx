import { useEffect, useState } from "react";

export interface ResponsiveConfig {
  [key: string]: {
    breakpoint: { max: number; min: number };
    items: number;
    slidesToSlide: number;
    partialVisibilityGutter?: number;
  };
}

export function useItemsPerPage(responsive: ResponsiveConfig): number {
  const [items, setItems] = useState(responsive.desktop.items);

  useEffect(() => {
    const updateItems = () => {
      const width = window.innerWidth;

      for (const key in responsive) {
        const bp = responsive[key].breakpoint;
        if (width <= bp.max && width >= bp.min) {
          setItems(responsive[key].items);
          break;
        }
      }
    };

    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, [responsive]);

  return items;
}
