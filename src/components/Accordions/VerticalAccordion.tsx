"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { RichTextField, KeyTextField, ImageField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { ReactNode } from "react";
import { FaChevronUp } from "react-icons/fa";
import { ResponsiveImage } from "../ResponsiveImage";

interface VerticalAccordionProps {
  title: string | KeyTextField | RichTextField;
  content: RichTextField;
  image?: ImageField;
  bgColorClass?: string;
  textColorClass?: string;
  button?: ReactNode;
  boldTitle?: boolean;
  background?: string;
}

export const VerticalAccordion: React.FC<VerticalAccordionProps> = ({
  title,
  content,
  image,
  button,
  boldTitle = true,
  background = "default",
}) => {
  return (
    <section className={`${background} w-full font-primary my-4 antialiased`}>
      <div className="p-px rounded-[10px] bg-midnight">
        <div className="rounded-[9px] bg-midnight/25 border border-aqua/60 glow-blur">
          <Disclosure>
            {({ open }) => (
              <div>
                <DisclosureButton
                  className={`focus print-reveal hover:cursor-pointer w-full px-6 py-7 flex flex-row justify-between items-center font-bold transition-all duration-300 outline-none rounded-[9px] print:p-2 print:font-bold ${
                    open
                      ? "selected-tab-style shadow-none border-none bg-midnight focus-visible:ring-2 focus-visible:ring-lavendar text-white"
                      : "text-gradient-light hover:bg-midnight/40"
                  }`}
                >
                  <div className="flex items-center text-left gap-4">
                    {image && <ResponsiveImage image={image} />}
                    <div
                      className={`text-lg text-left ${boldTitle ? "font-bold" : "font-normal"} ${
                        open ? "text-white" : ""
                      }`}
                    >
                      {typeof title === "string" ? (
                        title
                      ) : (
                        <PrismicRichText field={title} />
                      )}
                    </div>
                  </div>
                  <span
                    className={`text-white transform transition-transform ${open ? "" : "rotate-180"}`}
                  >
                    <FaChevronUp className="h-4 w-4" />
                  </span>
                </DisclosureButton>
                <DisclosurePanel
                  transition
                  unmount={false}
                  className="selected-tab-style shadow-none border-none bg-midnight rounded-lg pt-6 print-reveal px-6 pb-6 print:p-1 print:m-0 transition duration-200 ease-out data-closed:-translate-y-6 data-closed:opacity-0 text-white"
                >
                  <PrismicRichText field={content} />
                </DisclosurePanel>
              </div>
            )}
          </Disclosure>
        </div>
      </div>
    </section>
  );
};
