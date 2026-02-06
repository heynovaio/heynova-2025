import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Container, ContentBox, Section } from "@/components";
import { PricesDocumentData } from "../../../prismicio-types";
import { PriceCard } from "@/components/Cards/PriceCard";

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
  const options = prices?.options || [];
  console.log("options:", options);

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Container containerClassName="flex flex-col gap-6">
        <ContentBox
          title={slice.primary.title}
          smallerTextWidth={true}
          content={<PrismicRichText field={slice.primary.body} />}
        />

        <div className="flex flex-col md:flex-row gap-6 md:gap-14 w-full">
          {options.map((option) => (
            <PriceCard data={option} />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default PriceCards;
