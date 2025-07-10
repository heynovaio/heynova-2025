"use client";
import React from "react";
import { Container } from "../Layout";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import {
  ContentRelationshipField,
  ImageField,
  RichTextField,
  asText,
} from "@prismicio/client";
import Link from "next/link";
import GetAllInsightCategories from "@/utils/getAllInsightCategories";
import { InsightDocumentData } from "../../../prismicio-types";

interface TagsIntroProps {
  data: InsightDocumentData;
  id?: string | ContentRelationshipField;
  content?: React.ReactNode;
  tags: string[];
  lang?: string;
  uid?: string;
}

export const TagsIntro: React.FC<TagsIntroProps> = ({
  data,
  content,
  tags,
  lang = "en-ca",
  uid,
}) => {
  const imageExists = data.image?.url;
  const { data: insightCategories } = GetAllInsightCategories(lang);

  console.log(data);

  const getCategoryInfo = () => {
    if (!data.categories || data.categories.length === 0) {
      return { url: "#", name: "Other" };
    }

    const firstCategory = data.categories[0];

    // If the category data is already populated in the categories array
    if (firstCategory && firstCategory.name?.data?.title) {
      return {
        url: firstCategory.name.url || "#",
        name: asText(firstCategory.name.data.title),
      };
    }

    // If we need to find the category from insightCategories
    if (firstCategory.name?.id && insightCategories) {
      const matchedCategory = insightCategories.find(
        (category) => category.id === firstCategory.name.id
      );

      if (matchedCategory) {
        return {
          url: matchedCategory.url || "#",
          name: matchedCategory.data?.title
            ? asText(matchedCategory.data.title)
            : "Category",
        };
      }
    }

    // Fallback
    return {
      url: firstCategory.name?.url || "#",
      name: "Category",
    };
  };

  const categoryInfo = getCategoryInfo();

  return (
    <section
      className={`${
        imageExists ? "min-h-[600px] py-16" : "py-16  md:h-auto"
      }  flex items-center hero-content print:py-6 `}
    >
      <Container>
        <div
          className={`text-white flex flex-col sm:flex-row justify-between ${
            imageExists ? "sm:items-center" : "items-center"
          } padded-div py-0 pb-12 gap-8 mt-0 gradient-bottom-border`}
        >
          <div
            className={`${
              imageExists ? "basis-1/2" : "text-center grow mx-auto"
            } hero-container flex flex-col gap-8  order-1 max-w-[750px] sm:order-0 print-text`}
          >
            <span>
              <Link href={"/"}>Home</Link> /{" "}
              <Link href={categoryInfo.url}>{categoryInfo.name}</Link> /{" "}
              <Link href={`${categoryInfo.url}/${uid || ""}`}>
                <PrismicRichText field={data.title} />
              </Link>
            </span>
            <PrismicRichText
              field={data.title}
              components={{
                heading1: ({ children }) => (
                  <h1 className="gradient-text">{children}</h1>
                ),
              }}
            />

            {content}
            {data.paragraph && <PrismicRichText field={data.paragraph} />}

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {tags.map((tag: string) => (
                  <Link
                    key={tag}
                    className="text-white px-3 py-1 rounded-full border border-white text-sm hover:text-aqua hover:border-aqua"
                    href="/"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {imageExists && (
            <div className="basis-1/2 order-0 sm:order-1 print:mt-6 print:mb-0">
              <PrismicNextImage
                field={data.image}
                className="w-auto object-cover object-center rounded"
                fallbackAlt=""
                priority={true}
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};
