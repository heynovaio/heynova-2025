import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { ContentGrid } from "@/components/Grid/ContentGrid";
import { RichTextField, ImageField } from "@prismicio/client";
import { Section, Container } from "@/components";

/**
 * Props for `ContentListing`.
 */
export type ContentGridProps = SliceComponentProps<Content.ContentGridSlice>;

/**
 * Component for "ContentListing" Slices.
 */
const ContentListing: FC<ContentGridProps> = ({ slice }) => {
  const isGrid = slice.variation === "default";
  const numColumns = isGrid ? slice.primary.number_of_columns : undefined;

  const cards = (slice.primary.cards || []).map((card) => ({
    title: card.title as RichTextField,
    body: card.body as RichTextField,
    image: card.image as ImageField,
    button: Array.isArray(card.button) ? card.button[0] : card.button,
    image_style: card.image_style || false,
  }));

  return (
    <div className="bg-midnight">
      <Section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <Container>
          <ContentGrid
            cards={cards}
            numCols={numColumns}
            title={slice.primary.heading}
            body={slice.primary.text}
          />
        </Container>
      </Section>
    </div>
  );
};

export default ContentListing;
