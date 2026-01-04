"use client";

import React from "react";
import { Container } from "../Layout";
import { PrismicRichText } from "@prismicio/react";
import { KeyTextField, LinkField, RichTextField, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

interface HomeIntroProps {
  data: {
    title: RichTextField;
    body: RichTextField;
    buttons?: LinkField[];
    tagline?: string | KeyTextField;
  };
}

export const HomeIntro: React.FC<HomeIntroProps> = ({ data }) => {
  return (
    <section className="relative flex items-center w-full  md:min-h-[600px] min-h-[400px] md:mb-[-64px] md:mt-10">
      <Container>
        {data.tagline && (
          <p
            className="uppercase text-white font-extraBold text-md md:text-tagline text-center mb-2 animate-fade-in-down"
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
                  <h1 className=" gradient-text md:!text-[5.375rem]">
                    {children}
                  </h1>
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
                  <p className="font-[300] text-[1.375rem] max-w-[600px]">
                    {children}
                  </p>
                ),
              }}
            />
          </div>

          <div
            className="flex flex-row gap-4 md:gap-8"
            style={{
              animation: "fadeInUp 0.8s ease-out 0.6s both",
            }}
          >
            {(data.buttons ?? []).map((link, index) => 
              isFilled.link(link) ? (
                <PrismicNextLink
                  key={index}
                  field={link}
                  className={index === 0 ? "btn btn-primary" : "btn btn-outline"}
                />
              ) : null
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
