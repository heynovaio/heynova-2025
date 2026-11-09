"use client";

import { Content, asText, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import {
  Section,
  Container,
  ResponsiveImage,
  ContentBox,
  AnimatedSection,
} from "@/components";
import { JSX } from "react";
import { Grid } from "@/components/Grid";
import { getBandPosition } from "@/utils/angledBand";
import { getCardTone } from "@/components/Cards/cardColors";

type SliceContext = {
  lang: string;
  isBlogPage?: boolean;
};

/**
 * Props for `ContentColumn`.
 */
export type ContentColumnProps = SliceComponentProps<
  Content.ContentColumnSlice,
  SliceContext
>;

type ContentItem = Content.ContentColumnSliceDefaultPrimaryContentItem;

const ROTATIONS = [
  "rotate-[-6.16deg]",
  "rotate-[13.469deg]",
  "rotate-[-7.311deg]",
  "rotate-[6.358deg]",
];

const Arrow = () => (
  <span
    aria-hidden="true"
    className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 motion-reduce:transition-none"
  >
    →
  </span>
);

/**
 * The card's link. Its ::after covers the whole card so the card is
 * clickable, while screen readers still hear one descriptive link.
 */
const CardLink = ({
  item,
  className,
  fallbackText,
}: {
  item: ContentItem;
  className: string;
  fallbackText: string;
}) => {
  if (!isFilled.link(item.link)) return null;
  const title = asText(item.title).trim();
  const text = item.link.text?.trim() || fallbackText;
  return (
    <PrismicNextLink
      field={item.link}
      className={`${className} font-bold inline-flex items-center gap-2 no-underline after:absolute after:inset-0 after:rounded-[inherit] after:content-[''] focus-visible:outline-none`}
    >
      <span>
        {text}
        {title && !text.includes(title) && (
          <span className="sr-only">: {title}</span>
        )}
      </span>
      <Arrow />
    </PrismicNextLink>
  );
};

/** Standard card (default variation): dark bordered or a light colour. */
const ColumnCard = ({
  item,
  sectionColor,
  revealOnScroll,
}: {
  item: ContentItem;
  sectionColor?: string | null;
  revealOnScroll?: boolean;
}) => {
  const tone = getCardTone(sectionColor, item.card_color);
  const hasLink = isFilled.link(item.link);
  return (
    <div
      className={`${tone.card} ${revealOnScroll ? "reveal-on-scroll" : ""} group relative flex flex-col items-start gap-4 p-8 rounded-[1.5rem] h-full text-left ${
        hasLink
          ? "transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-lavendar"
          : ""
      }`}
    >
      {isFilled.image(item.icon) && (
        <ResponsiveImage
          image={item.icon}
          containerClassName="h-11 w-11 flex items-center justify-start"
        />
      )}
      <PrismicRichText
        field={item.title}
        components={{
          heading3: ({ children }) => (
            <h3 className={`${tone.title} text-h4! font-bold leading-snug`}>
              {children}
            </h3>
          ),
          heading4: ({ children }) => (
            <h4
              className={`${tone.title} text-h4! font-bold leading-snug py-0!`}
            >
              {children}
            </h4>
          ),
        }}
      />
      {isFilled.richText(item.body) && (
        <PrismicRichText
          field={item.body}
          components={{
            paragraph: ({ children }) => (
              <p className={`${tone.body} text-lg`}>{children}</p>
            ),
          }}
        />
      )}
      {hasLink && (
        <div className="mt-auto pt-2">
          <CardLink
            item={item}
            className={tone.link}
            fallbackText="Learn more"
          />
        </div>
      )}
    </div>
  );
};

/** Angled sector card (ContentColumn with Cards). */
const AngledCard = ({ item, index }: { item: ContentItem; index: number }) => {
  const custom =
    item.card_color && item.card_color !== "Default"
      ? getCardTone(null, item.card_color)
      : null;
  const hasLink = isFilled.link(item.link);
  return (
    <div
      className={`${ROTATIONS[index] ?? "rotate-0"} ${
        custom
          ? `${custom.card} border-[0.5px] border-midnight/20`
          : "border-aqua/50 bg-teal-drk/75 hover:bg-teal-drk/80 border-[0.5px] glow-blur"
      } group relative flex flex-col overflow-hidden items-center max-w-[400px] max-h-[400px] justify-center md:gap-6 p-5 md:w-full md:h-full aspect-square rounded-[20px] transition-all duration-300 ease-in-out ${
        hasLink
          ? "has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-lavendar"
          : ""
      }`}
    >
      {isFilled.image(item.icon) && (
        <ResponsiveImage
          image={item.icon}
          containerClassName="h-[100px] w-auto aspect-square flex items-center justify-center"
        />
      )}
      <div
        className={`mt-4 md:mt-0 text-center flex flex-col gap-2 ${custom ? "text-midnight" : ""}`}
      >
        <PrismicRichText
          field={item.title}
          components={{
            heading3: ({ children }) => (
              <h3
                className={`text-[1.375rem]! ${custom ? "text-midnight" : "text-light-blue"} font-extraBold`}
              >
                {children}
              </h3>
            ),
            heading4: ({ children }) => (
              <h4
                className={`text-[1.375rem]! ${custom ? "text-midnight" : "text-light-blue"} font-extraBold py-0!`}
              >
                {children}
              </h4>
            ),
          }}
        />
        {isFilled.richText(item.body) && <PrismicRichText field={item.body} />}
        {hasLink && (
          <CardLink
            item={item}
            className={`${custom ? "text-midnight" : "text-aqua"} justify-center`}
            fallbackText="Explore"
          />
        )}
      </div>
    </div>
  );
};

/**
 * Component for "ContentColumn" Slices.
 */
const ContentColumn = ({
  slice,
  context,
  slices,
  index: sliceIndex,
}: ContentColumnProps): JSX.Element => {
  const contentItems: ContentItem[] = Array.isArray(slice.primary.content)
    ? (slice.primary.content as ContentItem[])
    : [];
  const isBlog = context?.isBlogPage ?? false;
  const isSingleColumn = contentItems.length === 1;
  const isDefault = slice.variation === "default";

  const background = slice.primary.background_color;
  const bgColor =
    background === "Light" ? "bg-teal-muted/20 py-8 md:py-13" : "";

  const sectionColor =
    "card_color" in slice.primary ? slice.primary.card_color : null;
  const columns = "columns" in slice.primary ? slice.primary.columns : null;
  const isVertical =
    isDefault &&
    "layout" in slice.primary &&
    slice.primary.layout === "Vertical";

  const header = (centered: boolean) =>
    slice.primary.title && isFilled.richText(slice.primary.title) ? (
      <ContentBox
        title={slice.primary.title}
        titleClassName="text-aqua"
        content={
          <div className="text-bodyLarge">
            <PrismicRichText
              field={slice.primary.body}
              components={{
                paragraph: ({ children }) => (
                  <p className="mx-0!">{children}</p>
                ),
              }}
            />
          </div>
        }
        width="standard"
        containerClassName={`flex justify-center ${
          centered ? "items-center text-center" : "items-start text-start"
        }`}
      />
    ) : null;

  if (isVertical) {
    return (
      <Section
        band={getBandPosition(slices, sliceIndex)}
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        styling="overflow-x-clip"
        isBlogPage={isBlog}
      >
        <AnimatedSection className={bgColor}>
          <Container containerClassName="grid gap-10 lg:gap-16 lg:grid-cols-[5fr_7fr] items-start">
            <div className="lg:sticky lg:top-32">{header(false)}</div>
            <ul className="flex! flex-col gap-6 list-none! p-0! m-0!">
              {contentItems.map((item, index) => (
                <li key={index} className="mb-0!">
                  <ColumnCard
                    item={item}
                    sectionColor={sectionColor}
                    revealOnScroll
                  />
                </li>
              ))}
            </ul>
          </Container>
        </AnimatedSection>
      </Section>
    );
  }

  return (
    <Section
      band={getBandPosition(slices, sliceIndex)}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      styling={`overflow-x-hidden ${bgColor}`}
      isBlogPage={isBlog}
    >
      <AnimatedSection>
        <Container
          containerClassName={`${isSingleColumn ? "flex justify-center" : ""} flex flex-col`}
        >
          {header(Boolean(slice.primary.text_align)) && (
            <div className="mb-16">
              {header(Boolean(slice.primary.text_align))}
            </div>
          )}
          <Grid
            maxColumns={isDefault ? parseInt(String(columns ?? 1)) || 1 : 4}
            className={`${isDefault ? "" : "mt-16"} items-stretch gap-6 ${
              isSingleColumn ? "max-w-[860px] w-full" : "w-full"
            } ${isDefault ? "" : "justify-items-center"}`}
          >
            {contentItems.map((item, index) =>
              isDefault ? (
                <div key={index}>
                  {/* Each card fades in as it scrolls into view. */}
                  <ColumnCard
                    item={item}
                    sectionColor={sectionColor}
                    revealOnScroll
                  />
                </div>
              ) : (
                <AngledCard key={index} item={item} index={index} />
              ),
            )}
          </Grid>
        </Container>
      </AnimatedSection>
    </Section>
  );
};

export default ContentColumn;
