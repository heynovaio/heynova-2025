import React from "react";
import { Container } from "../Layout";
import { PrismicRichText } from "@prismicio/react";
import { KeyTextField, LinkField, RichTextField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { CalendlyButton } from "../Buttons/CalendlyButton";

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
    <section className="relative flex items-center w-full  md:min-h-[600px] min-h-[400px]">
      <Container>
        {data.tagline && (
          <p className="uppercase text-white font-extraBold text-md md:text-tagline text-center mb-2">
            {data.tagline}
          </p>
        )}

        <div className="text-white flex flex-col items-center text-center justify-between gap-8 mx-auto max-w-[900px]">
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
          <div className="flex flex-row gap-4 md:gap-8">
            {(data.buttons ?? []).map((link, index) => (
              <PrismicNextLink
                key={index}
                field={link}
                className={index === 0 ? "btn btn-primary" : "btn btn-outline"}
              />
            ))}
          </div>
          <CalendlyButton text="Book a Chat" buttonClass="btn-primary" />
        </div>
      </Container>
    </section>
  );
};
