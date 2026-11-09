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
import React, { Fragment, useEffect, useRef } from "react";
import {
  GlobalDocumentData,
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
  global?: GlobalDocumentData;
}

export const Header: React.FC<HeaderProps> = ({
  // menus,
  logo,
  slices,
  locales,
  global,
}) => {
  const headerRef = useRef<HTMLElement>(null);

  // Deepen the nav pill's background over the first 200px of scroll, from
  // 55% to 75% opacity. This writes a CSS variable directly, at most once per
  // frame, instead of re-rendering the whole header and menu on every scroll.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let frame = 0;
    let current = -1;
    const update = () => {
      frame = 0;
      const opacity = Math.round(
        (0.55 + Math.min(window.scrollY / 200, 1) * 0.2) * 100,
      );
      if (opacity === current) return;
      current = opacity;
      header.style.setProperty("--nav-bg-alpha", `${opacity / 100}`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Publish the header's height as --header-height so full-screen sections
  // (like the homepage hero) can fill exactly the space below it.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const root = document.documentElement;
    const observer = new ResizeObserver(() => {
      root.style.setProperty("--header-height", `${header.offsetHeight}px`);
    });
    observer.observe(header);
    return () => observer.disconnect();
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
      {/* The header itself is transparent; only the links sit on a rounded,
          translucent pill (.nav-pill). */}
      <header ref={headerRef} className="sticky top-0 z-50 header-bg">
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
            <PrismicNextImage
              field={logo}
              fallbackAlt=""
              priority
              sizes="(max-width: 768px) 140px, 180px"
              className="md:px-5 py-5 px-0"
            />
          </PrismicNextLink>

          {/* Desktop Menu - flex-1 to take space */}
          <div className="hidden lg:flex z-50 flex-1 justify-center">
            <div className="relative isolate flex items-center xl:gap-10 gap-3 px-4">
              {/* Drawn as a sibling layer, not a wrapper, so its blur doesn't
                  affect how the dropdown panels are positioned. */}
              <span
                aria-hidden="true"
                className="nav-pill absolute inset-0 -z-10 rounded-full"
              />
              <SliceZone slices={slices} components={components} />
            </div>
          </div>

          {/* Button - always visible, fixed width */}
          <div className="hidden lg:flex">
            <CalendlyButton
              text={global?.calendly_button_text || "Book a Discovery Call"}
              buttonClass="btn-primary"
              location="header_desktop"
            />
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden relative isolate">
            <span
              aria-hidden="true"
              className="nav-pill absolute inset-0 -z-10 rounded-full"
            />
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
                      <div
                        data-menu="hamburger"
                        className="flex flex-col px-6 my-10 items-center justify-center w-full"
                      >
                        <SliceZone slices={slices} components={components} />
                        <CalendlyButton
                          text={
                            global?.calendly_button_text ||
                            "Book a Discovery Call"
                          }
                          buttonClass="btn-primary"
                          location="header_mobile"
                        />
                      </div>
                      {locales && locales.length > 1 && (
                        <LanguageSwitcher
                          locales={locales}
                          classname="bottom-0 fixed right-0"
                        />
                      )}
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
