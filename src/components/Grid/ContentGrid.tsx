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

  const getResponsiveGridCols = (cols: number) => {
    const colsMap: Record<number, string> = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    };
    return colsMap[cols] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'; // Default
  };

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
        className={`grid gap-6 ${getResponsiveGridCols(numCols || 3)}`}
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
