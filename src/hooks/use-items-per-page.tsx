import { useEffect, useState } from "react";
import { ResponsiveType } from "react-multi-carousel";

export function useItemsPerPage(responsive: ResponsiveType): number {
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
