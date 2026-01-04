"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import React from "react";
import {
  ImageField,
  isFilled,
  LinkField,
  RichTextField,
} from "@prismicio/client";

import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { useState } from "react";

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
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <>
      <div className="hidden test md:block">
        <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <div className="flex gap-10">
            <TabList className="w-1/2 flex flex-col h-full flex-1">
              {titles.map((title, idx) => {
                return (
                  <div key={idx}>
                    {(idx === 0 && selectedIndex !== idx) ||
                    (idx > 0 &&
                      selectedIndex !== idx &&
                      selectedIndex !== idx - 1) ? (
                      <div className="h-[.5px] bg-gradient-to-r from-[#97e1e5] to-[#d9caf8]" />
                    ) : null}

                    <Tab
                      className={({ selected }) =>
                        `hover:cursor-pointer w-full px-6 py-10 flex flex-row justify-between items-center font-bold transition-all duration-300 outline-none ${
                          selected
                            ? "selected-tab-style"
                            : "text-gradient-light"
                        }`
                      }
                    >
                      <PrismicRichText
                        field={title}
                        components={{
                          heading3: ({ children }) => (
                            <h3 className="text-white">{children}</h3>
                          ),
                          heading4: ({ children }) => (
                            <h4 className="gradient-light">{children}</h4>
                          ),
                        }}
                      />
                      <FaChevronRight className="h-5 w-5 text-lavendar" />
                    </Tab>

                    {(idx === titles.length - 1 && selectedIndex !== idx) ||
                    (idx < titles.length - 1 &&
                      selectedIndex !== idx &&
                      selectedIndex !== idx + 1) ? (
                      <div className="h-[1px] bg-gradient-to-r from-[#97e1e5] to-[#d9caf8]" />
                    ) : null}
                  </div>
                );
              })}
            </TabList>

            <TabPanels className="w-1/2 p-[2px] rounded-[10px] flex-1 bg-midnight/25 border-aqua/70 border min-h-[400px] glow-blur">
              <div className="w-full h-full">
                {titles.map((_, idx) => (
                  <TabPanel
                    key={`panel-${idx}`}
                    className="h-full animate-fade-in-down"
                  >
                    <div className="h-full w-full py-10">
                      <div className="h-full flex items-center justify-start">
                        <div className="text-white text-left px-8 w-full max-w-2xl flex flex-col items-start">
                          {images[idx]?.url && (
                            <img
                              src={images[idx].url}
                              alt={images[idx].alt || `Image ${idx}`}
                              className="mb-6 max-h-[100px] p-3 object-contain block rounded-40 bg-midnight/60"
                            />
                          )}

                          <div className="mb-2 text-2xl font-semibold text-left">
                            <PrismicRichText
                              field={titles[idx]}
                              components={{
                                heading3: ({ children }) => (
                                  <h3 className="text-aqua">{children}</h3>
                                ),
                                heading4: ({ children }) => (
                                  <h4 className="text-aqua">{children}</h4>
                                ),
                              }}
                            />
                          </div>

                          <div className="text-base font-thin mt-5 space-y-4">
                            <PrismicRichText field={contents[idx]} />
                          </div>

                          {isFilled.link(buttons[idx]) && (
                            <PrismicNextLink
                              className="btn btn-primary mt-4"
                              field={buttons[idx]}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                ))}
              </div>
            </TabPanels>
          </div>
        </TabGroup>
      </div>

      <div className="block md:hidden">
        <TabGroup>
          <div className="flex flex-col gap-6">
            {titles.map((title, index) => (
              <div key={index} className="flex flex-col gap-2">
                <Tab
                  className={() =>
                    `px-6 py-7 rounded-[10px] flex justify-between font-bold transition-all duration-300 outline-none `
                  }
                >
                  {({ selected }) => (
                    <div className="flex items-center justify-between w-full ">
                      <div
                        className={selected ? "text-white" : "text-[#003D73]"}
                      >
                        <PrismicRichText
                          field={title}
                          components={{
                            heading3: ({ children }) => (
                              <h3
                                className={`${
                                  selected
                                    ? "gradient-light text-white"
                                    : "gradient-light"
                                }`}
                              >
                                {children}
                              </h3>
                            ),
                            heading4: ({ children }) => (
                              <h4
                                className={`${
                                  selected
                                    ? "gradient-light text-white"
                                    : "gradient-light"
                                }`}
                              >
                                {children}
                              </h4>
                            ),
                          }}
                        />
                      </div>
                      <FaChevronDown
                        className={`h-4 w-4 ${
                          selected ? "text-lavendar" : "text-lavendar"
                        }`}
                      />
                    </div>
                  )}
                </Tab>

                <TabPanel className="border rounded-[10px] min-h-[400px] gradient-card-bg py-10">
                  <div className="h-full flex items-center justify-center">
                    <div className="text-white text-center px-8 w-full max-w-2xl mx-auto flex flex-col items-center">
                      {images[index]?.url && (
                        <img
                          src={images[index].url}
                          alt={images[index].alt || `Image ${index}`}
                          className="mb-6 max-h-[80px] object-contain block mx-auto"
                        />
                      )}
                      <div className="mb-2 text-2xl font-semibold text-center text-purple-lt">
                        <PrismicRichText
                          field={titles[index]}
                          components={{
                            heading3: ({ children }) => (
                              <h3 className="text-purple-lt">{children}</h3>
                            ),
                            heading4: ({ children }) => (
                              <h4 className="text-purple-lt">{children}</h4>
                            ),
                          }}
                        />
                      </div>

                      <div className="text-base mt-5 space-y-4">
                        <PrismicRichText field={contents[index]} />
                      </div>

                      {isFilled.link(buttons[index]) && (
                        <PrismicNextLink
                          className="btn btn-primary mt-4"
                          field={buttons[index]}
                        />
                      )}
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
