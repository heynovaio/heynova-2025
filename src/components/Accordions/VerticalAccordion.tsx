"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { RichTextField, KeyTextField, ImageField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { FaChevronUp } from "react-icons/fa";
import { ResponsiveImage } from "../ResponsiveImage";
import type { CardTone } from "../Cards/cardColors";

interface VerticalAccordionProps {
  title: string | KeyTextField | RichTextField;
  content: RichTextField;
  image?: ImageField;
  bgColorClass?: string;
  textColorClass?: string;
  boldTitle?: boolean;
  background?: string;
  /**
   * Light card colour for the "Sound familiar" FAQ style: the question reads
   * like a problem card and the answer opens inside the same card.
   */
  tone?: CardTone;
}

// The chevron turns with an inline transform rather than a `rotate-*` class,
// because AnimatedSection treats any `rotate-*` element as an angled card.
const chevronStyle = (open: boolean) => ({
  transform: open ? "rotate(0deg)" : "rotate(180deg)",
});

export const VerticalAccordion: React.FC<VerticalAccordionProps> = ({
  title,
  content,
  image,
  boldTitle = true,
  background = "default",
  tone,
}) => {
  const titleNode =
    typeof title === "string" ? (
      title
    ) : (
      <PrismicRichText
        field={title}
        components={{
          heading3: ({ children }) => (
            <h3 className="text-inherit! text-[1.25rem]! md:text-[1.5rem]! font-bold! leading-snug">
              {children}
            </h3>
          ),
          heading4: ({ children }) => (
            <h4 className="text-inherit! text-[1.25rem]! md:text-[1.5rem]! font-bold! leading-snug py-0!">
              {children}
            </h4>
          ),
        }}
      />
    );

  if (tone) {
    return (
      <div className={`${background} w-full my-3 max-w-215`}>
        <Disclosure>
          {({ open }) => (
            <div
              className={`${tone.card} ${tone.title} rounded-[1.75rem] transition-shadow duration-300 ${open ? "shadow-[0_18px_40px_rgba(0,0,0,0.35)]" : ""}`}
            >
              <DisclosureButton className="print-reveal w-full text-left px-6 py-6 md:px-8 md:py-7 flex flex-row justify-between items-center gap-6 rounded-[1.75rem] hover:cursor-pointer focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white">
                <div className="flex items-center gap-4">
                  {image && <ResponsiveImage image={image} />}
                  {titleNode}
                </div>
                <span
                  className="shrink-0 transition-transform duration-300 motion-reduce:transition-none"
                  style={chevronStyle(open)}
                >
                  <FaChevronUp aria-hidden="true" className="h-4 w-4" />
                </span>
              </DisclosureButton>
              <DisclosurePanel
                unmount={false}
                className={`print-reveal px-6 pb-7 md:px-8 ${tone.body} faq-answer`}
              >
                <PrismicRichText field={content} />
              </DisclosurePanel>
            </div>
          )}
        </Disclosure>
      </div>
    );
  }

  return (
    <section
      className={`${background} w-full font-primary my-4 antialiased max-w-215`}
    >
      <div className="p-px rounded-[10px] bg-midnight">
        <div className="rounded-[9px] bg-midnight/25 border border-aqua/60 glow-blur">
          <Disclosure>
            {({ open }) => (
              <div>
                <DisclosureButton
                  className={`focus:ring-2 mb-[0.7px] focus:ring-lavendar print-reveal hover:cursor-pointer w-full px-6 py-7 flex flex-row justify-between items-center font-bold transition-all duration-300 outline-none rounded-[9px] print:p-2 print:font-bold ${
                    open
                      ? "selected-tab-style shadow-none border-none bg-midnight text-white"
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
                    className="text-white transform transition-transform"
                    style={chevronStyle(open)}
                  >
                    <FaChevronUp aria-hidden="true" className="h-4 w-4" />
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
