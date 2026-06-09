"use client";

import React from "react";
import { Container, Section } from "../Layout";
import {
  asText,
  ImageField,
  KeyTextField,
  LinkField,
  RichTextField,
} from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { AnimatedSection } from "../AnimatedSection";
import { ResponsiveImage } from "../ResponsiveImage";
import { ContentBox } from "../ContentBox";
import { isFilled } from "@prismicio/client";
import { InsightDocumentData } from "../../../prismicio-types";
import { FaArrowRight } from "react-icons/fa";

interface SectorItem {
  sector: {
    url?: string;
    slug?: string;
    data?: { title?: RichTextField | string };
  };
}

interface ServiceItem {
  service: {
    url?: string;
    slug?: string;
    data?: { title?: RichTextField | string; tagline?: KeyTextField };
  };
}

interface InsightItem {
  insight: {
    uid?: string;
    slug?: string;
    data?: {
      title?: RichTextField | string;
      meta_description?: KeyTextField;
      image?: ImageField;
    };
  };
}

interface GeneralHeroProps {
  data: {
    background_color: string;
    title: RichTextField;
    body?: RichTextField;
    button?: LinkField[];
    link?: LinkField;
    tagline?: KeyTextField;
    image?: ImageField;
    services?: ServiceItem[];
    sectors?: SectorItem[];
    insights?: InsightItem[];
  };
}

function formatSlug(slug?: string): string {
  if (!slug) return "";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getTitle(item: {
  url?: string;
  slug?: string;
  data?: { title?: RichTextField | string };
}): string {
  const title = item.data?.title;
  if (typeof title === "string" && title) return title;
  if (Array.isArray(title) && title.length > 0) {
    const firstNode = title[0] as { text?: string };
    if (firstNode?.text) return firstNode.text;
  }
  return formatSlug(item.slug);
}

function truncateText(
  text: string | null | undefined,
  wordLimit: number,
): string {
  if (!text) return "";
  const words = text.split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "...";
}

export const WorkExampleIntro: React.FC<GeneralHeroProps> = ({ data }) => {
  console.log("Work examples data: ", data);

  const background = data.background_color;
  const bgColor =
    background === "Light" ? "bg-teal-muted/20 py-8 md:py-16" : "";

  const buttons = data.button?.some((item) => isFilled.link(item))
    ? data.button.map((link, index) =>
        isFilled.link(link) ? (
          <PrismicNextLink
            field={link}
            key={index}
            className="btn btn-primary"
          />
        ) : null,
      )
    : undefined;

  const hasSectors = data.sectors && data.sectors.length > 0;
  const hasServices = data.services && data.services.length > 0;
  const hasInsights = data.insights && data.insights.length > 0;

  const renderPillColumn = (
    items: Array<{
      url?: string;
      slug?: string;
      data?: { title?: RichTextField | string };
    }>,
    label: string,
  ) => (
    <div className="flex flex-col gap-4 flex-1">
      <span className="font-extrabold text-lg">{label}</span>
      <div className="flex flex-col gap-2">
        {items.map((item, index) => {
          const title = getTitle(item);
          return item.url ? (
            <a
              key={index}
              href={item.url}
              className="btn btn-secondary focus-ring text-start inline-block text-[0.9rem] px-3 py-1 rounded-full border border-border-default text-text-default transition-colors no-underline w-fit"
            >
              {title}
            </a>
          ) : (
            <span
              key={index}
              className="inline-block text-sm px-3 py-1 rounded-full border border-border-default text-text-default w-fit"
            >
              {title}
            </span>
          );
        })}
      </div>
    </div>
  );

  const renderInsights = () => {
    if (!hasInsights) return null;

    return (
      <div className="rounded-[20px] p-[0.5px] flex flex-col">
        <div className="overflow-hidden rounded-[20px] flex flex-col gap-5 h-full py-6">
          {data.insights!.map((insightItem, index) => {
            const insight = insightItem.insight; // unwrap the relation
            if (!insight?.data) return null;

            const uid = insight.uid;
            const title = getTitle(insight);
            const description = insight.data.meta_description ?? "";
            const truncatedDesc = truncateText(description, 120);

            return (
              <div key={index} className="flex flex-col gap-3 text-start">
                {title && (
                  <span className="font-extrabold text-lg self-start">
                    Insight
                  </span>
                )}
                {truncatedDesc && (
                  <p className="text-text-default/80 leading-relaxed">
                    {truncatedDesc}
                  </p>
                )}
                {uid && (
                  <a
                    href={`/insights/${uid}`}
                    className="btn btn-primary no-underline w-fit mt-2"
                  >
                    Read more
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const taxonomyContent =
    hasSectors || hasServices || hasInsights ? (
      <div className="flex flex-col gap-2">
        {(hasSectors || hasServices) && (
          <div className="flex flex-row gap-8 mt-8">
            {hasSectors &&
              renderPillColumn(
                data.sectors!.map((i) => i.sector),
                "Sectors",
              )}

            {hasSectors && hasServices && (
              <div className="w-px bg-white self-stretch" />
            )}

            {hasServices &&
              renderPillColumn(
                data.services!.map((i) => i.service),
                "Services",
              )}
          </div>
        )}

        {hasInsights && renderInsights()}
      </div>
    ) : undefined;

  return (
    <Section>
      <AnimatedSection className={`${bgColor}`}>
        <Container containerClassName="flex flex-col md:flex-row-reverse flex-wrap md:flex-nowrap gap-4 w-full items-center">
          <div className="w-full md:w-1/2 rounded-[20px] flex flex-col glow-blur">
            <div className="bg-teal-muted/20 border-aqua/20 border overflow-hidden rounded-[20px] flex flex-col h-full">
              {data.image && (
                <PrismicNextImage
                  field={data.image}
                  fallbackAlt=""
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover general-card-image"
                />
              )}
              <div className="flex items-center justify-between p-5">
                <PrismicNextLink
                  field={data.link}
                  className="text-sm font-medium text-white 
                              hover:text-aqua hover:underline
                              focus:text-aqua 
                              focus-ring
                              flex gap-5 justify-between"
                >
                  <span>{data.link?.text || "Go to Website"}</span>
                  <FaArrowRight className="w-5 h-5" />
                </PrismicNextLink>
              </div>
            </div>
          </div>

          <div className="w-full text-center md:text-start md:w-1/2">
            <ContentBox
              title={data.title}
              tagline={data.tagline}
              content={taxonomyContent}
            />
          </div>
        </Container>
      </AnimatedSection>
    </Section>
  );
};
