"use client";

import React, { JSX } from "react";
import { SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";

import { HorizontalAccordion } from "@/components/Accordions/HorizontalAccordion";

export type HorizontalAccordionSliceProps =
  SliceComponentProps<Content.HorizontalAccordionSlice>;

const HorizontalAccordionSlice = ({
  slice,
}: HorizontalAccordionSliceProps): JSX.Element | null => {
  if (!slice.primary.accordion) {
    return null;
  }

  const titles = slice.primary.accordion.map((item) => item.title || "");
  const contents = slice.primary.accordion.map((item) => item.body || "");
  const images = slice.primary.accordion.map((item) => item.icon || null);

  // const buttons = slice.primary.accordion.map((item, idx) => {
  //   const btn = item.buttons?.[0]?.button_link;

  //   if (isFilled.link(btn)) {
  //     return (
  //       <a
  //         key={idx}
  //         href={btn.url}
  //         target={btn.target || "_self"}
  //         rel={btn.target === "_blank" ? "noopener noreferrer" : undefined}
  //         className="btn btn-primary inline-flex items-center gap-2"
  //       >
  //         {btn.text || "See More"} <FaChevronRight className="w-4 h-4" />
  //       </a>
  //     );
  //   }
  //   return null;
  // });

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-midnight p-6"
    >
      <HorizontalAccordion
        titles={titles}
        contents={contents}
        images={images}
        // buttons={buttons}
      />
    </section>
  );
};

export default HorizontalAccordionSlice;
