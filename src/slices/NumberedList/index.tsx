import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { NumberList } from "@/components/NumberedList";
import { Section, Container } from "@/components";

/**
 * Props for `NumberedList`.
 */
export type NumberedListProps = SliceComponentProps<Content.NumberedListSlice>;

/**
 * Component for "NumberedList" Slices.
 */
const NumberedList: FC<NumberedListProps> = ({ slice }) => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Container>
        <NumberList
          title={slice.primary.title}
          body={slice.primary.body}
          listItems={slice.primary.list}
        />
      </Container>
    </Section>
  );
};

export default NumberedList;
