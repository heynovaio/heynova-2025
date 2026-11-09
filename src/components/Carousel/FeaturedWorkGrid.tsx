import { Content, asText, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Container } from "../Layout";
import { ContentBox } from "../ContentBox";

type FeaturedWorkSlice =
  SliceComponentProps<Content.ContentCarouselSlice>["slice"];

const Arrow = () => (
  <span
    aria-hidden="true"
    className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 motion-reduce:transition-none"
  >
    →
  </span>
);

// Thin aqua-to-lilac gradient border from the Figma work cards.
const gradientBorder =
  "border border-transparent [background:linear-gradient(var(--color-card-navy),var(--color-card-navy))_padding-box,linear-gradient(90deg,var(--color-aqua),#d9caf8)_border-box]";

/**
 * "Featured Work Grid" variation: one featured case study above a grid of
 * work cards. Cards are entered manually for now.
 */
export const FeaturedWorkGrid = ({ slice }: { slice: FeaturedWorkSlice }) => {
  if (slice.variation !== "featuredWorkGrid") return null;
  const primary = slice.primary;
  const featuredTitle = asText(primary.featured_title).trim();
  const hasFeatured = Boolean(featuredTitle);

  return (
    <div
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Container containerClassName="flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <ContentBox
            title={primary.title}
            titleClassName="text-aqua"
            content={
              isFilled.richText(primary.body) ? (
                <div className="text-bodyLarge">
                  <PrismicRichText field={primary.body} />
                </div>
              ) : undefined
            }
            containerClassName="items-start text-start"
          />
          {isFilled.link(primary.button) && (
            <PrismicNextLink
              field={primary.button}
              className="btn btn-outline shrink-0 self-start md:self-end"
            />
          )}
        </div>

        {hasFeatured && (
          <article className="group grid md:grid-cols-2 rounded-[2rem] overflow-hidden bg-light-blue text-midnight">
            <div className="bg-purple-drk p-6 md:p-12 flex items-center justify-center">
              {isFilled.image(primary.featured_image) && (
                <PrismicNextImage
                  field={primary.featured_image}
                  sizes="(min-width: 905px) 40vw, 90vw"
                  className="w-full h-auto rounded-2xl border border-lavendar shadow-[0_4px_24px_rgba(0,179,251,0.35)]"
                />
              )}
            </div>
            <div className="p-8 md:p-14 flex flex-col justify-center gap-4">
              {primary.featured_eyebrow && (
                <p className="uppercase tracking-[0.08em] text-[0.9375rem] font-medium text-teal-drk">
                  {primary.featured_eyebrow}
                </p>
              )}
              <h3 className="text-midnight text-[1.75rem]! md:text-[2.25rem]! font-extraBold! leading-tight">
                {featuredTitle}
              </h3>
              {isFilled.richText(primary.featured_body) && (
                <div className="text-midnight [&_a]:text-wine [&_a]:underline">
                  <PrismicRichText field={primary.featured_body} />
                </div>
              )}
              {isFilled.link(primary.featured_link) && (
                <PrismicNextLink
                  field={primary.featured_link}
                  className="text-wine font-bold inline-flex items-center gap-2 hover:text-wine! focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-wine rounded"
                >
                  <span>
                    {primary.featured_link.text || "Read the case study"}
                    <span className="sr-only">: {featuredTitle}</span>
                  </span>
                  <Arrow />
                </PrismicNextLink>
              )}
            </div>
          </article>
        )}

        {primary.cards.length > 0 && (
          <ul className="grid! grid-animate list-none! p-0! m-0! grid-cols-1 md:grid-cols-2 gap-8">
            {primary.cards.map((card, index) => {
              const title = asText(card.title).trim();
              const tags = [card.tag_1, card.tag_2, card.tag_3].filter(
                (tag): tag is string => Boolean(tag && tag.trim()),
              );
              return (
                <li key={index} className="mb-0!">
                  <article
                    className={`${gradientBorder} h-full rounded-[20px] glow-blur flex flex-col gap-8 p-6 md:px-11 md:pt-[4.5rem] md:pb-11`}
                  >
                    {isFilled.image(card.image) && (
                      <div className="aspect-[621/370] overflow-hidden rounded-[20px] bg-purple-lt">
                        <PrismicNextImage
                          field={card.image}
                          sizes="(min-width: 905px) 40vw, 90vw"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    )}
                    <div className="flex flex-col items-start gap-6 mt-auto">
                      {title && (
                        <h3 className="text-white text-[1.5rem]! md:text-[1.875rem]! font-medium leading-tight">
                          {title}
                        </h3>
                      )}
                      {tags.length > 0 && (
                        <ul
                          aria-label="Services"
                          className="list-none! p-0! m-0! flex! flex-wrap gap-3 md:gap-5"
                        >
                          {tags.map((tag) => (
                            <li
                              key={tag}
                              className="mb-0! rounded-full px-3 pt-[3px] pb-[5px] text-base md:text-lg border border-transparent [background:linear-gradient(var(--color-card-navy),var(--color-card-navy))_padding-box,linear-gradient(90deg,var(--color-aqua),#d9caf8)_border-box]"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      )}
                      {isFilled.link(card.button) && (
                        <PrismicNextLink
                          field={card.button}
                          className="btn btn-primary"
                        >
                          {card.button.text || "Learn More"}
                          {title && <span className="sr-only">: {title}</span>}
                        </PrismicNextLink>
                      )}
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </Container>
    </div>
  );
};
