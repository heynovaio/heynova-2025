"use client";
import { ContentBox, AnimatedSection } from "@/components";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";
import { FaChevronDown } from "react-icons/fa";

/**
 * Props for `CategoryMenuPanel`.
 */
export type CategoryMenuPanelProps =
  SliceComponentProps<Content.CategoryMenuPanelSlice>;

/**
 * Component for "MenuPanel" Slices.
 */

const CategoryMenuPanel = ({ slice }: CategoryMenuPanelProps): JSX.Element => {
  const numColumns3 = slice.primary.columns === true;

  return (
    <AnimatedSection>
      <>
        <Popover
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="relative hidden lg:flex"
        >
          {({ open }) => (
            <>
              <PopoverButton className="flex items-center w-full gap-2 rounded-full text-nowrap lg:justify-center no-underline p-4 text-left relative after:content-[''] after:absolute after:bottom-3 after:left-1/2 after:right-1/2 after:h-[2px] after:bg-current after:transition-all after:duration-300 after:ease-in-out hover:after:left-5 hover:after:right-5 menu-panel-hover">
                {slice.primary.menu_display || "Dropdown"}
                <FaChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
              </PopoverButton>
              <PopoverPanel
                transition
                anchor="bottom"
                className="bg-midnight/80 menuPanel bg-gradient-dark z-10 w-screen fixed left-0 right-0 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] translate-y-6 data-[closed]:-translate-y-1 data-[closed]:opacity-0"
              >
                <div className="px-16 py-10 lg:px-28 lg:py-20 flex justify-center w-full">
                  <div className="w-full max-w-7xl flex">
                    <ContentBox
                      title={slice.primary.title}
                      titleClassName="gradient-text"
                      content={
                        <div className="flex flex-col gap-6">
                          <PrismicRichText field={slice.primary.body} />
                          <div className="bg-teal-muted  text-black p-4 rounded-lg">
                            <p className="font-extraBold">
                              Not sure where to start?
                            </p>
                            <p className="text-[1rem]">
                              Book a 30 minute free call
                            </p>
                          </div>
                        </div>
                      }
                      containerClassName="border-r-[0.5px] border-white basis-1/3 lg:pr-18 pr-16 py-5"
                    />
                    <div className="flex flex-col basis-2/3 justify-center text-white lg:pl-10 pl-8 py-5 w-full">
                      {/* Blocks */}
                      {slice.primary.blocks?.length > 0 && (
                        <div className="mb-8">
                          {slice.primary.blocks_title && (
                            <h3 className="mb-3 text-lg font-bold text-aqua uppercase text-[1.25rem]">
                              {slice.primary.blocks_title}
                            </h3>
                          )}

                          <div className="flex flex-wrap gap-4 text-left">
                            {slice.primary.blocks.map((item, index) => (
                              <div
                                key={index}
                                className="flex flex-col rounded-lg border border-aqua p-4 basis-[calc(33.333%-1rem)] bg-aqua/20 "
                              >
                                {item.title && (
                                  <PrismicNextLink
                                    field={item.title}
                                    className="mb-2 text-base font-bold hover:underline text-aqua"
                                    prefetch={false}
                                  />
                                )}

                                {item.body && (
                                  <div className="text-sm leading-relaxed">
                                    <PrismicRichText field={item.body} />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Pills */}
                      {slice.primary.pills?.length > 0 && (
                        <div>
                          {slice.primary.pills_title && (
                            <h3 className="mb-3 text-lg font-bold text-lavendar uppercase text-[1.25rem]">
                              {slice.primary.pills_title}
                            </h3>
                          )}

                          <div className="flex flex-wrap gap-2">
                            {slice.primary.pills.map((item, index) => (
                              <PrismicNextLink
                                key={index}
                                field={item.title}
                                className="rounded-full border border-lavendar  bg-lavendar/20  px-4 py-2 text-sm transition-colors hover:bg-white/10"
                                prefetch={false}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </>
          )}
        </Popover>

        <Disclosure
          as="div"
          className="flex flex-col lg:hidden relative gap-2 w-full"
          suppressHydrationWarning
        >
          {({ open }) => (
            <>
              <DisclosureButton
                className={`flex gap-4 items-center rounded-full p-5 justify-between ${
                  open ? "bg-white/10" : "bg-transparent"
                }`}
                suppressHydrationWarning
              >
                <div className="w-3 h-3"></div>
                <span className="text-[1.75rem]">
                  {slice.primary.menu_display || "Dropdown"}
                </span>
                <FaChevronDown
                  className={`h-6 w-6 transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </DisclosureButton>

              <DisclosurePanel
                className="w-full text-base overflow-hidden"
                unmount={false}
                transition
                suppressHydrationWarning
              >
                {({ open }) => (
                  <div
                    className={`transition-all duration-500 ease-in ${
                      open
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2"
                    }`}
                  >
                    {/* Intro */}
                    <div className="border-b border-white pb-4 mb-4 px-5">
                      <ContentBox
                        content={
                          <PrismicRichText
                            field={slice.primary.body}
                            components={{
                              paragraph: ({ children }) => (
                                <p className="text-md font-normal !max-w-none">
                                  {children}
                                </p>
                              ),
                            }}
                          />
                        }
                        containerClassName="mb-4 text-white"
                      />
                    </div>

                    <div className="flex flex-col text-white px-5 pb-5">
                      {/* Blocks */}
                      {slice.primary.blocks?.length > 0 && (
                        <div className="mb-8">
                          {slice.primary.blocks_title && (
                            <h3 className="mb-4 text-lg font-bold">
                              {slice.primary.blocks_title}
                            </h3>
                          )}

                          <div className="flex flex-col gap-4">
                            {slice.primary.blocks.map((item, index) => (
                              <div
                                key={index}
                                className="flex flex-col rounded-lg border border-aqua bg-aqua/20 backdrop-blur-lg p-4"
                              >
                                {item.title && (
                                  <PrismicNextLink
                                    field={item.title}
                                    className="mb-2 font-bold hover:underline"
                                    prefetch={false}
                                  />
                                )}

                                {item.body && (
                                  <div className="text-sm leading-relaxed">
                                    <PrismicRichText field={item.body} />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Pills */}
                      {slice.primary.pills?.length > 0 && (
                        <div>
                          {slice.primary.pills_title && (
                            <h3 className="mb-4 text-lg font-bold">
                              {slice.primary.pills_title}
                            </h3>
                          )}

                          <div className="flex flex-wrap gap-2">
                            {slice.primary.pills.map((item, index) => (
                              <PrismicNextLink
                                key={index}
                                field={item.title}
                                className="rounded-full border border-aqua px-4 py-2 text-sm transition-colors hover:bg-white/10"
                                prefetch={false}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      </>
    </AnimatedSection>
  );
};

export default CategoryMenuPanel;
