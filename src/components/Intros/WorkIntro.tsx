"use client";
import React from "react";
import { Container } from "../Layout";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { ContentRelationshipField } from "@prismicio/client";
import Link from "next/link";
import { Simplify, WorkExampleDocumentData } from "../../../prismicio-types";

interface WorkIntroProps {
  data: Simplify<WorkExampleDocumentData>;
  id?: string | ContentRelationshipField;
  content?: React.ReactNode;
  lang?: string;
  uid?: string;
}

export const WorkIntro: React.FC<WorkIntroProps> = ({ data, uid }) => {
  const imageExists = data.image?.url;

  console.log("UID in WorkIntro:", uid);
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
            {/** TODO: UPDATE THE BREADCRUMB LINKS TO work-examples ONCE I SWITCH THE UNDERSCORE FOR HYPHEN */}
            <span>
              <Link href={"/"}>Home</Link> /{" "}
              <Link href={"/our-work"}>Work Examples</Link> /{" "}
              <Link href={`/work_examples/${uid || ""}`}>{uid}</Link>{" "}
              {/** TODO: ^^^^^^^^^^^^^ check w/ kirsten on whether this should be title or url and make not clickable  */}
            </span>
            <PrismicRichText
              field={data.title}
              components={{
                heading1: ({ children }) => (
                  <h1 className="gradient-text">{children}</h1>
                ),
              }}
            />
            {data.body && <PrismicRichText field={data.body} />}
          </div>

          {imageExists && (
            <div className="basis-1/2 order-0 sm:order-1 print:mt-6 print:mb-0">
              <PrismicNextImage
                field={data.image}
                className="w-auto object-cover object-center rounded"
                fallbackAlt=""
                priority
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};
