"use client";

import React from "react";
import { Container } from "../Layout";
import { PrismicRichText } from "@prismicio/react";
import {
  ImageField,
  isFilled,
  KeyTextField,
  LinkField,
  RichTextField,
} from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Link from "next/link";

interface GeneralHeroProps {
  data: {
    title: RichTextField;
    body?: RichTextField;
    buttons?: LinkField[];
    /** @deprecated older name, kept for compatibility */
    button?: LinkField[];
    tagline?: string | KeyTextField;
  };
  /** Visible breadcrumb trail, last item is the current page. */
  breadcrumbs?: { name: string; href: string }[];
  /**
   * Hero photo. When filled, the hero switches to two columns: text on the
   * left, photo on the right (stacked on smaller screens). Without it the
   * hero stays centred. Passed by the sector and service pages.
   */
  image?: ImageField;
}

export const DefaultIntro: React.FC<GeneralHeroProps> = ({
  data,
  breadcrumbs,
  image,
}) => {
  const buttons = (data.buttons ?? data.button ?? []).filter((link) =>
    isFilled.link(link),
  );
  const hasImage = isFilled.image(image);
  // Centred by default; left-aligned when sharing the row with a photo.
  const align = hasImage
    ? { flex: "items-start text-left", justify: "justify-start" }
    : { flex: "items-center text-center", justify: "justify-center" };

  const text = (
    <>
      {breadcrumbs && breadcrumbs.length > 1 && (
        <nav
          aria-label="Breadcrumb"
          className={`mb-6 flex ${align.justify}`}
          style={{ animation: "fadeInDown 0.8s ease-out both" }}
        >
          <ol
            className={`list-none! p-0! m-0! flex! flex-wrap items-center ${align.justify} gap-x-2 gap-y-1 text-base text-purple-lt`}
          >
            {breadcrumbs.map((crumb, index) => {
              const isCurrent = index === breadcrumbs.length - 1;
              return (
                <li key={crumb.href} className="mb-0! flex items-center gap-2">
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
          className={`uppercase text-white font-extraBold text-md md:text-tagline mb-2 ${
            hasImage ? "text-left" : "text-center"
          }`}
          style={{
            animation: "fadeInDown 0.8s ease-out 0.1s both",
          }}
        >
          {data.tagline}
        </p>
      )}

      <div
        className={`text-white flex flex-col ${align.flex} justify-between gap-8 ${
          hasImage ? "" : "mx-auto max-w-[900px]"
        }`}
      >
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
                  <p
                    className={`font-[300] text-[1.375rem] ${hasImage ? "mx-0!" : ""}`}
                  >
                    {children}
                  </p>
                ),
              }}
            />
          </div>
        )}

        {buttons.length > 0 && (
          <div
            className={`flex flex-row flex-wrap ${align.justify} gap-4`}
            style={{
              animation: "fadeInUp 0.8s ease-out 0.6s both",
            }}
          >
            {buttons.map((link, index) => (
              <PrismicNextLink
                key={index}
                field={link}
                className={index === 0 ? "btn btn-primary" : "btn btn-outline"}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );

  return (
    <section className="relative flex items-start w-full py-16 md:py-24 mb-[-36px] md:mb-[-72px]">
      <Container
        containerClassName={
          hasImage
            ? // minmax(0,1fr) and min-w-0 let long titles wrap instead of
              // stretching the column past the screen on phones.
              "grid gap-10 lg:gap-16 grid-cols-[minmax(0,1fr)] lg:grid-cols-2 items-center"
            : ""
        }
      >
        {hasImage ? (
          <>
            <div className="min-w-0">{text}</div>
            <div
              className="min-w-0 w-full overflow-hidden rounded-[2rem] aspect-[4/3]"
              style={{ animation: "fadeInLeft 0.8s ease-out 0.3s both" }}
            >
              <PrismicNextImage
                field={image}
                // Decorative unless the editor gave it alt text in Prismic.
                fallbackAlt=""
                priority
                sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
                className="w-full h-full object-cover rounded-none!"
              />
            </div>
          </>
        ) : (
          text
        )}
      </Container>
    </section>
  );
};
