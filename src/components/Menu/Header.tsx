"use client";

import { components } from "@/slices";
import {
  Popover,
  PopoverButton,
  Transition,
  PopoverPanel,
} from "@headlessui/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";
import React, { Fragment, useEffect, useState } from "react";
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
  const [bgOpacity, setBgOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Fade in from 0 to 0.34 opacity over 200px scroll
      const opacity = Math.min(scrollY / 200, 0.54);
      setBgOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeInZoom {
          from {
            opacity: 0;
            transform: scale(1.05);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .header-bg {
          animation: fadeInZoom 0.8s ease-out both;
        }
      `}</style>
      <header
        className="sticky top-0 z-50 header-bg"
        style={{
          backdropFilter: "blur(25px)",
          background: `rgba(14, 1, 46, ${bgOpacity})`,
        }}
      >
        <nav
          aria-label="Main Nav"
          className="flex items-center px-5 py-3 gap-3 justify-between"
        >
          <PrismicNextLink
            className="flex max-w-[180px] md:max-w-[220px]"
            aria-label="homepage link"
            prefetch={true}
            href={`/`}
          >
            <PrismicNextImage field={logo} fallbackAlt="" className="md:px-5 py-5 px-0" />
          </PrismicNextLink>

          {/* Desktop Menu - flex-1 to take space */}
          <div className="hidden lg:flex items-center xl:gap-10 gap-3 z-50 flex-1 justify-center">
            <SliceZone slices={slices} components={components} />
          </div>

          {/* Button - always visible, fixed width */}
          <div className="w-[174px]">
            <CalendlyButton text="Book a Chat" buttonClass="btn-primary" />
          </div>

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
                      className={`block absolute h-0.5 w-8 gradient-light-full transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-0" : "-translate-y-2"}`}
                    ></span>
                    <span
                      className={`block absolute h-0.5 w-8 gradient-light-full transform transition duration-300 ease-in-out ${open ? "opacity-0" : "opacity-100"}`}
                    ></span>
                    <span
                      className={`block absolute h-0.5 w-8 gradient-light-full transform transition duration-300 ease-in-out ${open ? "-rotate-45 translate-y-0" : "translate-y-2"}`}
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
    </>
  );
};
