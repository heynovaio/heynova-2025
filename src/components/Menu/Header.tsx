import { components } from "@/slices";
import {
  Popover,
  PopoverButton,
  Transition,
  PopoverPanel,
} from "@headlessui/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";
import React, { Fragment } from "react";
import {
  MenusDocumentData,
  MenusDocumentDataSlicesSlice,
} from "../../../prismicio-types";
import { ImageField, PrismicDocument } from "@prismicio/client";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CalendlyButton } from "../Buttons/CalendlyButton";

interface HeaderProps {
  logo: ImageField;
  slices: MenusDocumentDataSlicesSlice[];
  menus?: MenusDocumentData;
  locales: PrismicDocument[];
}

export const Header: React.FC<HeaderProps> = ({
  // menus,
  logo,
  slices,
  locales,
}) => {
  return (
    <header
      className="sticky top-0 z-50 border-b-[0.5px] border-aqua"
      style={{
        backdropFilter: "blur(25px)",
        background: "rgba(14, 1, 46, .34)",
      }}
    >
      <nav
        aria-label="Main Nav"
        className="flex justify-between items-center px-5 py-3 "
      >
        <PrismicNextLink
          className="flex max-w-[180px] md:max-w-[220px] "
          aria-label="homepage link"
          prefetch={true}
          href={`/`}
        >
          <PrismicNextImage field={logo} fallbackAlt="" className="p-5" />
        </PrismicNextLink>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center xl:gap-10 gap-3 z-50 ">
          <SliceZone slices={slices} components={components} />
        </div>

        <CalendlyButton text="Book a Chat" buttonClass="btn-primary" />

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Popover className="relative">
            {({ open }) => (
              <>
                <PopoverButton
                  className="inline-flex justify-center w-full p-2 relative group"
                  aria-label="Main Menu"
                >
                  <div className="flex flex-col justify-center items-center w-8 h-8">
                    <span
                      className={`block absolute h-0.5 w-8 gradient-border transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-0" : "-translate-y-2"}`}
                    ></span>
                    <span
                      className={`block absolute h-0.5 w-8 gradient-border transform transition duration-300 ease-in-out ${open ? "opacity-0" : "opacity-100"}`}
                    ></span>
                    <span
                      className={`block absolute h-0.5 w-8 gradient-border transform transition duration-300 ease-in-out ${open ? "-rotate-45 translate-y-0" : "translate-y-2"}`}
                    ></span>
                  </div>
                </PopoverButton>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 translate-x-full"
                  enterTo="transform opacity-100 translate-x-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="transform opacity-100 translate-x-0"
                  leaveTo="transform opacity-0 translate-x-full"
                >
                  <PopoverPanel
                    anchor="bottom"
                    className="w-screen h-screen bg-midnight bg-gradient-dark lg:mt-4 pb-10 z-40"
                  >
                    <div className="flex flex-col px-6 my-10 items-center justify-center w-full">
                      <SliceZone slices={slices} components={components} />
                      <CalendlyButton
                        text="Book a Chat"
                        buttonClass="btn-primary"
                      />
                    </div>
                    <LanguageSwitcher
                      locales={locales}
                      classname="bottom-0 fixed right-0"
                    />
                  </PopoverPanel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      </nav>
    </header>
  );
};
