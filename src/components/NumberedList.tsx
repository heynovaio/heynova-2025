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
      <div className="w-full md:w-2/5">
        <ContentBox
          title={title}
          titleClassName="text-aqua"
          content={<PrismicRichText field={body} />}
        />
      </div>

      <div className="w-full md:w-3/5 text-content">
        <ol className="text-content">
          {listItems.map((item, index) => (
            <li key={index} className="">
              <div>
                <PrismicRichText field={item.title} />

                {item.body && (
                  <div className="li-content">
                    <PrismicRichText field={item.body} />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
