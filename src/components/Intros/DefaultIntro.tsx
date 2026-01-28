"use client";

import React from "react";
import { Container } from "../Layout";
import { PrismicRichText } from "@prismicio/react";
import { KeyTextField, LinkField, RichTextField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

interface GeneralHeroProps {
  data: {
    title: RichTextField;
    body: RichTextField;
    button?: LinkField[];
    tagline?: string | KeyTextField;
  };
}

export const DefaultIntro: React.FC<GeneralHeroProps> = ({ data }) => {
  return (
    <section className="relative flex items-start w-full py-16 md:py-24 mb-[-36px] md:mb-[-72px]">
      <Container>
        {data.tagline && (
          <p
            className="uppercase text-white font-extraBold text-md md:text-tagline text-center mb-2"
            style={{
              animation: "fadeInDown 0.8s ease-out 0.1s both",
            }}
          >
            {data.tagline}
          </p>
        )}

        <div className="text-white flex flex-col items-center text-center justify-between gap-8 mx-auto max-w-[900px]">
          <div
            style={{
              animation: "fadeInDown 0.8s ease-out 0.2s both",
            }}
          >
            <PrismicRichText
              field={data.title}
              components={{
                heading1: ({ children }) => (
                  <h1 className=" gradient-text pb-2">{children}</h1>
                ),
              }}
            />
          </div>

          <div
            style={{
              animation: "fadeInUp 0.8s ease-out 0.4s both",
            }}
          >
            <PrismicRichText
              field={data.body}
              components={{
                paragraph: ({ children }) => (
                  <p className="font-[300] text-[1.375rem]">{children}</p>
                ),
              }}
            />
          </div>

          <div
            style={{
              animation: "fadeInUp 0.8s ease-out 0.6s both",
            }}
          >
            {(data.button ?? []).map((link, index) => (
              <PrismicNextLink key={index} field={link} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
