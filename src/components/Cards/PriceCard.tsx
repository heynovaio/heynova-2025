import { KeyTextField, LinkField, RichTextField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

interface PriceCardProps {
  data: {
    title: KeyTextField;
    subtitle: KeyTextField;
    features: RichTextField;
    button_label: LinkField;
  };
  highlightedCard?: boolean;
}

export const PriceCard = ({
  data,
  highlightedCard = false,
}: PriceCardProps) => {
  const isHighlightedCard = highlightedCard ? "scale-108 bg-purple-drk" : "";
  return (
    <div
      className={` border border-white rounded-[1.25rem] p-6 w-full ${isHighlightedCard}`}
    >
      <p>{data.subtitle}</p>
      <h3>{data.title}</h3>
      <div className="ml-6 md:ml-0">
        {" "}
        <PrismicRichText field={data.features} />
      </div>

      <PrismicNextLink field={data.button_label} className="btn btn-outline">
        {data.button_label?.text || "Buy Now"}
      </PrismicNextLink>
    </div>
  );
};
