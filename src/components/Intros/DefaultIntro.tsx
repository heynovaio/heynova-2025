"use client";

import React from "react";
import { Container } from "../Layout";
import { PrismicRichText } from "@prismicio/react";
import { KeyTextField, LinkField, RichTextField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";

interface GeneralHeroProps {
  data: {
    title: RichTextField;
    body?: RichTextField;
    button?: LinkField[];
    tagline?: string | KeyTextField;
  };
  /** Visible breadcrumb trail, last item is the current page. */
  breadcrumbs?: { name: string; href: string }[];
}

export const DefaultIntro: React.FC<GeneralHeroProps> = ({
  data,
  breadcrumbs,
}) => {
  return (
    <section className="relative flex items-start w-full py-16 md:py-24 mb-[-36px] md:mb-[-72px]">
      <Container>
        {breadcrumbs && breadcrumbs.length > 1 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex justify-center"
            style={{ animation: "fadeInDown 0.8s ease-out both" }}
          >
            <ol className="list-none! p-0! m-0! flex! flex-wrap items-center justify-center gap-x-2 gap-y-1 text-base text-purple-lt">
              {breadcrumbs.map((crumb, index) => {
                const isCurrent = index === breadcrumbs.length - 1;
                return (
                  <li
                    key={crumb.href}
                    className="mb-0! flex items-center gap-2"
                  >
                    {isCurrent ? (
                      <span
                        aria-current="page"
                        className="text-white font-medium"
                      >
                        {crumb.name}
                      </span>
                    ) : (
                      <>
                        <Link
                          href={crumb.href}
                          className="text-aqua underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavendar rounded"
                        >
                          {crumb.name}
                        </Link>
                        <span aria-hidden="true" className="text-purple-lt/70">
                          /
                        </span>
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
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

          {data.body && (
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
          )}

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
