"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import React from "react";
import { ImageField, LinkField, RichTextField } from "@prismicio/client";

import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

interface HorizontalAccordionProps {
  titles: RichTextField[];
  contents: RichTextField[];
  images?: ImageField[];
  buttons?: LinkField[];
}

export const HorizontalAccordion: React.FC<HorizontalAccordionProps> = ({
  titles,
  contents,
  images = [],
  buttons = [],
}) => {
  return (
    <>
      <div className="hidden md:block">
        <TabGroup>
          <div className="flex gap-6">
            <TabList className="w-2/5 flex flex-col">
              {titles.map((title, idx) => (
                <div key={idx}>
                  {idx === 0 && (
                    <div className="h-[2px] bg-gradient-to-r from-[#97e1e5] to-[#d9caf8]" />
                  )}

                  {idx !== 0 && (
                    <div className="h-[2px] bg-gradient-to-r from-[#97e1e5] to-[#d9caf8]" />
                  )}

                  <Tab
                    className={({ selected }) =>
                      `w-full px-6 py-7 flex flex-row justify-between font-bold transition-all duration-300 outline-none ${
                        selected ? "selected-tab-style" : "text-gradient-light"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <div className="flex items-center justify-between flex-1">
                        <div
                          className={selected ? "text-white" : "text-[#003D73]"}
                        >
                          <PrismicRichText
                            field={title}
                            components={{
                              heading3: ({ children }) => (
                                <h3 className="gradient-light">{children}</h3>
                              ),
                            }}
                          />
                        </div>
                        <FaChevronRight className="h-5 w-5 text-lavendar" />
                      </div>
                    )}
                  </Tab>

                  {idx === titles.length - 1 && (
                    <div className="h-[2px] bg-gradient-to-r from-[#97e1e5] to-[#d9caf8]" />
                  )}
                </div>
              ))}
            </TabList>

            <TabPanels className="w-3/5 border rounded-[10px]  gradient-card-bg min-h-[400px]">
              {titles.map((_, idx) => (
                <TabPanel key={`panel-${idx}`} className="h-full">
                  <div className="h-full w-full py-10">
                    <div className="h-full flex items-center justify-center">
                      <div className="text-white text-center px-8 w-full max-w-2xl mx-auto flex flex-col items-center">
                        {images[idx]?.url && (
                          <img
                            src={images[idx].url}
                            alt={images[idx].alt || `Image ${idx}`}
                            className="mb-6 max-h-[80px] object-contain block mx-auto"
                          />
                        )}

                        <div className="mb-2 text-2xl font-semibold text-center">
                          <PrismicRichText
                            field={titles[idx]}
                            components={{
                              heading3: ({ children }) => (
                                <h3 className="text-purple-lt">{children}</h3>
                              ),
                            }}
                          />
                        </div>

                        <div className="text-base mt-5 space-y-4">
                          <PrismicRichText field={contents[idx]} />
                        </div>

                        {buttons?.[idx] && (
                          <PrismicNextLink
                            className="btn-btn-primary"
                            field={buttons[idx]}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </TabPanel>
              ))}
            </TabPanels>
          </div>
        </TabGroup>
      </div>

      <div className="block md:hidden">
        <TabGroup>
          <div className="flex flex-col gap-6">
            {titles.map((title, index) => (
              <div key={index} className="flex flex-col gap-2">
                <Tab className="px-6 py-7 bg-[#C8E7F7] border rounded-[10px] flex justify-between font-bold data-[selected]:bg-[#003D73] data-[selected]:text-white">
                  {({ selected }) => (
                    <div className="flex items-center justify-between w-full">
                      <div
                        className={selected ? "text-white" : "text-[#003D73]"}
                      >
                        <PrismicRichText field={title} />
                      </div>
                      <FaChevronDown
                        className={`h-4 w-4 ${
                          selected ? "text-[#DA7857]" : "text-[#003D73]"
                        }`}
                      />
                    </div>
                  )}
                </Tab>

                <TabPanel className="border rounded-[10px] bg-[#003D73] min-h-[400px]">
                  <div className="h-full w-full py-10">
                    <div className="h-full flex items-center justify-center">
                      <div className="text-white text-center px-8 w-full max-w-2xl mx-auto flex flex-col items-center">
                        {images[index]?.url && (
                          <img
                            src={images[index].url}
                            alt={images[index].alt || `Image ${index}`}
                            className="mb-6 max-h-[80px] object-contain block mx-auto"
                          />
                        )}
                        <div
                          className="mb-2 text-2xl font-semibold text-center"
                          style={{
                            color: "#C8E7F7",
                            fontFamily: "Lato, sans-serif",
                          }}
                        >
                          <PrismicRichText field={titles[index]} />
                        </div>

                        <div className="text-base mt-5 space-y-4">
                          <PrismicRichText field={contents[index]} />
                        </div>

                        {buttons?.[index] && (
                          <PrismicNextLink
                            className="btn-btn-primary"
                            field={buttons[index]}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </div>
            ))}
          </div>
        </TabGroup>
      </div>
    </>
  );
};
