"use client";
import { ContentBox } from "@/components";
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
 * Props for `MenuPanel`.
 */
export type MenuPanelProps = SliceComponentProps<Content.MenuPanelSlice>;

/**
 * Component for "MenuPanel" Slices.
 */
const MenuPanel = ({ slice }: MenuPanelProps): JSX.Element => {
  const numColumns3 = slice.primary.columns === true;

  return (
    <>
      <Popover
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="relative hidden lg:flex"
      >
        {({ open }) => (
          <>
            <PopoverButton className="flex items-center w-full gap-2 rounded-full text-nowrap lg:justify-center no-underline p-4 text-left relative after:content-[''] after:absolute after:bottom-3 after:left-1/2 after:right-1/2 after:h-[2px] after:bg-current after:transition-all after:duration-300 after:ease-in-out hover:after:left-5 hover:after:right-5">
              {slice.primary.menu_display || "Dropdown"}
              <FaChevronDown
                className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
            </PopoverButton>
            <PopoverPanel
              transition
              anchor="bottom"
              className="bg-midnight bg-gradient-dark z-10 w-full transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] translate-y-6 data-[closed]:-translate-y-1 data-[closed]:opacity-0"
            >
              <div className="px-16 py-10 lg:px-28 lg:py-20 flex ">
                <ContentBox
                  title={slice.primary.title}
                  titleClassName="gradient-text"
                  content={<PrismicRichText field={slice.primary.body} />}
                  containerClassName="border-r-[0.5px] border-white basis-1/3 lg:pr-32 pr-16 py-5"
                />
                <div className="flex flex-col basis-2/3 justify-center text-white lg:pl-32 pl-16 py-5 w-full">
                  <div
                    className={`mb-8 grid gap-x-24 gap-y-4 text-left ${
                      numColumns3 ? "grid-cols-3" : "grid-cols-2"
                    }`}
                  >
                    {(slice.primary.links || []).map((linkItem, linkIndex) => (
                      <PrismicNextLink
                        key={linkIndex}
                        field={linkItem}
                        className="text-base font-bold hover:underline p-2 rounded-4xl"
                      >
                        {linkItem.text}
                      </PrismicNextLink>
                    ))}
                    {slice.primary.link_with_paragraph.map((item, index) => {
                      return (
                        <div key={index} className="flex flex-col">
                          {item.title && (
                            <PrismicNextLink
                              field={item.title}
                              className="font-bold hover:underline p-2 rounded-4xl"
                              prefetch={false}
                            />
                          )}
                          {item.body && (
                            <div className="p-2 text-sm">
                              <PrismicRichText field={item.body} />
                            </div>
                          )}
                        </div>
                      );
                    })}
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
      >
        {({ open }) => (
          <>
            <DisclosureButton className="flex gap-4 items-center rounded-full p-5 justify-between ">
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
            >
              {({ open }) => (
                <div
                  className={`transition-all duration-500 ease-in ${
                    open
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2"
                  }`}
                >
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
                    {(slice.primary.links || []).map((linkItem, linkIndex) => (
                      <PrismicNextLink
                        key={linkIndex}
                        field={linkItem}
                        className="text-base hover:underline rounded-full py-2"
                      >
                        {linkItem.text}
                      </PrismicNextLink>
                    ))}
                    {slice.primary.link_with_paragraph.map((item, index) => (
                      <div key={index} className="mb-8">
                        {item.title && (
                          <div className="mb-4">
                            <PrismicNextLink
                              field={item.title}
                              className="rounded-full"
                            />
                          </div>
                        )}
                        {item.body && (
                          <div className="mb-4">
                            <PrismicRichText field={item.body} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default MenuPanel;
