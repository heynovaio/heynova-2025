import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Container, Section } from "@/components";
import { PricesDocumentData } from "../../../prismicio-types";

type SliceContext = {
  pricesDocumentData?: PricesDocumentData;
};
/**
 * Props for `PriceCards`.
 */
export type PriceCardsProps = SliceComponentProps<
  Content.PriceCardsSlice,
  SliceContext
>;

/**
 * Component for "PriceCards" Slices.
 */
const PriceCards: FC<PriceCardsProps> = ({ slice, context }) => {
  const prices = context?.pricesDocumentData;
  console.log("prices document data:", prices);

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Container>test blah blah</Container>
    </Section>
  );
};

export default PriceCards;
