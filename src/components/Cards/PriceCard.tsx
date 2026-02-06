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
  //TODO: once cyndis done the final design can use this to accent the card that has the most popular tag like the exmaple design she gave me
  console.log("highlighted card:", highlightedCard);
  return (
    <div className="border border-white rounded-[1.25rem] p-6 w-full">
      <p>{data.subtitle}</p>
      <h3>{data.title}</h3>
      <PrismicRichText field={data.features} />
      <PrismicNextLink field={data.button_label} className="btn btn-outline">
        {data.button_label?.text || "Buy Now"}
      </PrismicNextLink>
    </div>
  );
};
