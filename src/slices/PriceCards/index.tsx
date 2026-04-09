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
  const options = prices?.options || [];
  const mostPopularOption = options.find(
    (option) => option.subtitle == "Most Popular",
  );

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      styling="bg-midnight"
    >
      <Container containerClassName="flex flex-col gap-4">
        <PrismicRichText field={slice.primary.title} />
        <PrismicRichText field={slice.primary.body} />
        <div className="flex flex-col md:flex-row gap-6 md:gap-14 w-full mt-4">
          {options.map((option) => (
            <PriceCard
              data={option}
              highlightedCard={option === mostPopularOption}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default PriceCards;
