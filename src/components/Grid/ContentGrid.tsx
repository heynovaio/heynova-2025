import {
  ImageField,
  RichTextField,
  LinkField,
  NumberField,
} from "@prismicio/client";
import { ReusableCard } from "@/components/Cards/ReusableCard";
import { PrismicRichText } from "@prismicio/react";

interface ContentGridProps {
  cards: Array<{
    title?: RichTextField;
    body?: RichTextField;
    image?: ImageField;
    button?: LinkField;
    image_style?: boolean;
  }>;
  numCols?: NumberField;
  title?: RichTextField;
  body?: RichTextField;
}

export const ContentGrid: React.FC<ContentGridProps> = ({
  cards,
  numCols,
  title,
  body,
}) => {
  const columns = numCols && numCols > 0 ? numCols : 3;

  return (
    <div>
      <div className="mb-6 flex flex-col gap-2">
        <span className="text-aqua">
          <PrismicRichText field={title} />
        </span>

        <PrismicRichText field={body} />
      </div>
      {/** TODO: Figure out mobile layout not working */}
      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {cards.map((card, index) => (
          <ReusableCard
            key={index}
            title={card.title}
            body={card.body}
            image={card.image}
            imageStyle={card.image_style || false}
            button={card.button}
          />
        ))}
      </div>
    </div>
  );
};
