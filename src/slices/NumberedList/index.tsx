"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { NumberList } from "@/components/NumberedList";
import { Section, Container, AnimatedSection } from "@/components";

type SliceContext = {
  lang: string;
  isBlogPage?: boolean;
};

/**
 * Props for `NumberedList`.
 */
export type NumberedListProps = SliceComponentProps<
  Content.NumberedListSlice,
  SliceContext
>;
/**
 * Component for "NumberedList" Slices.
 */
const NumberedList: FC<NumberedListProps> = ({ slice, context }) => {
  const isBlog = context?.isBlogPage ?? false;
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      isBlogPage={isBlog}
    >
      <AnimatedSection>
        <Container>
          <NumberList
            title={slice.primary.title}
            body={slice.primary.body}
            listItems={slice.primary.list}
          />
        </Container>
      </AnimatedSection>
    </Section>
  );
};

export default NumberedList;
