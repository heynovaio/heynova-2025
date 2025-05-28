import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Container, ContentBox, Section } from "@/components";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `CtaBanner`.
 */
export type CtaBannerProps = SliceComponentProps<Content.CtaBannerSlice>;

/**
 * Component for "CtaBanner" Slices.
 */
const CtaBanner: FC<CtaBannerProps> = ({ slice }) => {
  const leftAligned = slice.primary.text_alignment === false;
  const textAlignment = leftAligned
    ? "items-start text-left"
    : "items-center text-center";
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      backgroundColor={slice.primary.background_color}
    >
      <Container>
        <div
          className={`rounded-[] bg-teal-muted text-midnight p-6 md:p-24 ${textAlignment} flex flex-col gap-6`}
        >
          <ContentBox
            title={slice.primary.title}
            content={<PrismicRichText field={slice.primary.body} />}
            buttons={slice.primary.buttons.map((button, index) => {
              return (
                <PrismicNextLink
                  field={button}
                  key={index}
                  className="btn btn-secondary"
                />
              );
            })}
            containerClassName={textAlignment}
          />
        </div>
      </Container>
    </Section>
  );
};

export default CtaBanner;
