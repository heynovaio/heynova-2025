"use client";

import React from "react";
import { Container } from "../Layout";
import { PrismicRichText } from "@prismicio/react";
import {
  ImageField,
  KeyTextField,
  LinkField,
  RichTextField,
  SelectField,
  isFilled,
} from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { HeroTag } from "../HeroTag";

interface HeroTagItem {
  icon?: ImageField;
  text?: KeyTextField;
  color?: SelectField | string | null;
}

interface HomeIntroProps {
  data: {
    title: RichTextField;
    body: RichTextField;
    buttons?: LinkField[];
    tagline?: string | KeyTextField;
    hero_tags?: HeroTagItem[];
  };
}

// Staggered left offsets for the stacked hero tags, as in the Figma layout.
const TAG_OFFSETS = ["md:ml-10", "md:ml-0", "md:ml-5"];

export const HomeIntro: React.FC<HomeIntroProps> = ({ data }) => {
  const tags = (data.hero_tags ?? []).filter((tag) => tag.text?.trim());

  return (
    // Fills the screen below the sticky header, so the next section starts
    // below the fold. `svh` stays stable while mobile browser bars move.
    <section className="relative flex items-center w-full min-h-[calc(100svh-var(--header-height,80px))] pt-10 pb-16 md:pt-24 md:pb-20">
      <Container containerClassName="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] items-center">
        <div className="text-white flex flex-col items-start text-left gap-7 max-w-[800px]">
          {data.tagline && (
            <p
              className="uppercase tracking-[0.08em] text-[0.9375rem] font-medium text-aqua"
              style={{ animation: "fadeInDown 0.8s ease-out 0.1s both" }}
            >
              {data.tagline}
            </p>
          )}

          <div style={{ animation: "fadeInDown 0.8s ease-out 0.2s both" }}>
            <PrismicRichText
              field={data.title}
              components={{
                heading1: ({ children }) => (
                  <h1 className="gradient-text md:text-h1-home!">{children}</h1>
                ),
              }}
            />
          </div>

          <div style={{ animation: "fadeInUp 0.8s ease-out 0.4s both" }}>
            <PrismicRichText
              field={data.body}
              components={{
                paragraph: ({ children }) => (
                  <p className="font-[300] text-[1.375rem] max-w-[680px]">
                    {children}
                  </p>
                ),
              }}
            />
          </div>

          <div
            className="flex flex-row flex-wrap gap-4"
            style={{ animation: "fadeInUp 0.8s ease-out 0.6s both" }}
          >
            {(data.buttons ?? []).map((link, index) =>
              isFilled.link(link) ? (
                <PrismicNextLink
                  key={index}
                  field={link}
                  className={
                    index === 0 ? "btn btn-primary" : "btn btn-outline"
                  }
                />
              ) : null,
            )}
          </div>
        </div>

        {tags.length > 0 && (
          <ul
            className="list-none! p-0! m-0! flex! flex-col gap-[18px]"
            style={{ animation: "fadeInLeft 0.8s ease-out 0.5s both" }}
          >
            {tags.map((tag, index) => (
              <HeroTag
                key={index}
                as="li"
                text={tag.text as string}
                icon={tag.icon}
                colour={tag.color as string | null}
                className={`mb-0! ${TAG_OFFSETS[index % TAG_OFFSETS.length]}`}
              />
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
};
