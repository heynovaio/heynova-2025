"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import React, { ReactNode } from "react";
import { ImageField, RichTextField, EmbedField } from "@prismicio/client";

import { PrismicRichText } from "@prismicio/react";

interface HorizontalAccordionProps {
  titles: RichTextField[];
  contents: (string | RichTextField)[];
  images?: ImageField[];
  buttons?: ReactNode[];
  videos?: EmbedField[];
}

export const HorizontalAccordion: React.FC<HorizontalAccordionProps> = ({
  titles,
  contents,
  images = [],
  buttons = [],
  videos = [],
}) => {
  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("watch?v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.includes("vimeo.com/") && !url.includes("player.vimeo.com")) {
      const vimeoId = url.split("/").pop();
      return `https://player.vimeo.com/video/${vimeoId}`;
    }

    return url; // fallback
  };

  return (
    <>
      {/* Desktop view */}
      <div className="hidden md:block">
        <TabGroup>
          <div className="flex gap-6">
            <TabList className="w-2/5 flex flex-col ">
              {titles.map((title, idx) => (
                <Tab
                  key={idx}
                  className={`px-6 py-7 border-t flex flex-row justify-between font-bold data-[selected]:bg-navy   ${
                    idx === titles.length - 1 ? "border-b" : ""
                  }`}
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
                      <FaChevronRight
                        className={`h-5 w-5 ${
                          selected ? "text-lavendar" : "text-lavendar"
                        }`}
                      />
                    </div>
                  )}
                </Tab>
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

                        <div
                          className="mb-2 text-2xl font-semibold text-center"
                          style={{}}
                        >
                          <PrismicRichText
                            field={titles[idx]}
                            components={{
                              heading3: ({ children }) => (
                                <h3 className="text-purple-lt">{children}</h3>
                              ),
                            }}
                          />
                        </div>

                        {(typeof contents[idx] === "string" &&
                          contents[idx].trim() !== "") ||
                        (Array.isArray(contents[idx]) &&
                          contents[idx]?.length > 0) ? (
                          <div className="text-base mt-5">
                            {typeof contents[idx] === "string" ? (
                              <p>{contents[idx]}</p>
                            ) : (
                              <div className="space-y-4">
                                <PrismicRichText
                                  field={contents[idx] as RichTextField}
                                />
                              </div>
                            )}
                          </div>
                        ) : null}

                        {videos?.[idx]?.embed_url && (
                          <div className="my-6 w-full max-w-3xl aspect-video">
                            <iframe
                              src={getEmbedUrl(videos[idx].embed_url)}
                              title={videos[idx].title || "Embedded video"}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full rounded-md"
                              width="100%"
                            />
                          </div>
                        )}

                        {buttons?.[idx] && (
                          <div className="mt-6">{buttons[idx]}</div>
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

      {/* Mobile view */}
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

                        {(typeof contents[index] === "string" &&
                          contents[index].trim() !== "") ||
                        (Array.isArray(contents[index]) &&
                          contents[index]?.length > 0) ? (
                          <div className="text-base mt-5">
                            {typeof contents[index] === "string" ? (
                              <p>{contents[index]}</p>
                            ) : (
                              <div className="space-y-4">
                                <PrismicRichText
                                  field={contents[index] as RichTextField}
                                />
                              </div>
                            )}
                          </div>
                        ) : null}

                        {videos?.[index]?.embed_url && (
                          <div className="my-6 w-full max-w-3xl aspect-video">
                            <iframe
                              src={videos[index].embed_url.replace(
                                "watch?v=",
                                "embed/"
                              )}
                              title={videos[index].title || "Embedded video"}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full rounded-md"
                            />
                          </div>
                        )}

                        {buttons?.[index] && (
                          <div className="mt-6">{buttons[index]}</div>
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
