import { RichTextField } from "@prismicio/client";
import { ContentBox } from "./ContentBox";
import { PrismicRichText } from "@prismicio/react";

interface NumberListItem {
  title: RichTextField;
  body: RichTextField;
}

interface NumberListProps {
  title: RichTextField;
  body: RichTextField;
  listItems: NumberListItem[];
}

export const NumberList = ({ title, body, listItems }: NumberListProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-20">
      <ContentBox title={title} content={<PrismicRichText field={body} />} />

      <div className="text-content">
        <ol>
          {listItems.map((item, index) => (
            <li key={index}>
              <div className="list-item-content">
                <PrismicRichText field={item.title} />
                {item.body && <PrismicRichText field={item.body} />}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
