"use client";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import React, { useState, useRef } from "react";
import Carousel from "react-multi-carousel";
import { Container, Section } from "../Layout";
import { responsive } from "./responsive";
import { CarouselButton } from "../Buttons/CarouselButtons";
import { useItemsPerPage } from "@/hooks/use-items-per-page";
import { PrismicNextImage } from "@prismicio/next";
import { ContentBox } from "../ContentBox";

export type PhotoCarouselProps = {
  slice: SliceComponentProps<Content.ContentCarouselSlice>["slice"];
};

export const PhotoCarousel = ({ slice }: PhotoCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<Carousel>(null);

  const itemsPerPage = useItemsPerPage(responsive);

  const totalSlides = Math.max(
    0,
    slice.primary.cards.length - itemsPerPage + 1
  );

  const handleArrowClick = (direction: "next" | "prev") => {
    if (direction === "next" && currentSlide < totalSlides - 1) {
      carouselRef.current?.next(1);
    } else if (direction === "prev" && currentSlide > 0) {
      carouselRef.current?.previous(1);
    }
  };

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      styling="overflow-x-hidden flex flex-col gap-8"
    >
      <Container containerClassName="flex justify-end">
        <ContentBox
          title={slice.primary.title}
          titleClassName="text-aqua"
          content={
            <div className="text-bodyLarge">
              <PrismicRichText
                field={slice.primary.body}
                components={{
                  paragraph: ({ children }) => (
                    <p className="!mx-0">{children}</p>
                  ),
                }}
              />
            </div>
          }
          width="standard"
          containerClassName="gap-4"
        />
        {slice.primary.cards.length > itemsPerPage && (
          <CarouselButton
            currentSlide={currentSlide + 1}
            totalSlides={totalSlides}
            onSlideChange={handleArrowClick}
            styling="w-fit"
          />
        )}
      </Container>

      <Container>
        <Carousel
          responsive={responsive}
          partialVisible
          keyBoardControl
          arrows={false}
          ref={carouselRef}
          beforeChange={(nextSlide) => setCurrentSlide(nextSlide)}
          containerClass="image-carousel m-0 focus:focus focus:outline-offset-8 !overflow-visible"
        >
          {slice.primary.cards.map((item, index) => {
            const hasImage =
              typeof item === "object" &&
              item !== null &&
              "image" in item &&
              item.image;

            return (
              <div key={index} className="pr-3 md:pr-7 flex">
                {hasImage ? (
                  <PrismicNextImage
                    field={item.image}
                    fallbackAlt=""
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="text-center py-8 h-full flex items-center justify-center">
                    No image available
                  </div>
                )}
              </div>
            );
          })}
        </Carousel>
      </Container>
    </Section>
  );
};
