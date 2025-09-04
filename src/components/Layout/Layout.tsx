"use client";

import React, { ReactNode, useEffect } from "react";
import {
  GlobalDocumentData,
  MenusDocumentData,
} from "../../../prismicio-types";
import { PrismicDocument } from "@prismicio/client";
import { Announcement, Footer, Header } from "../Menu";
import Link from "next/link";
import NewsletterSignupBanner from "../Newsletter";

interface LayoutProps {
  locales: PrismicDocument[];
  menus: MenusDocumentData;
  global: GlobalDocumentData;
  children: ReactNode;
  backgroundType: "primary" | "secondary";
}

export const Layout = ({
  locales,
  menus,
  global,
  children,
  backgroundType,
}: LayoutProps) => {
  useEffect(() => {
    document.body.classList.remove("bg-primary", "bg-secondary");

    document.body.classList.add(`bg-${backgroundType}`);
  }, [backgroundType]);

  return (
    <div>
      <Link
        href="#main-content"
        className="bg-primary skip-content text-white rounded p-2 text-center transition-transform duration-300 transform -translate-y-full -translate-x-1/2 fixed left-1/2 z-[100] focus:translate-y-0"
        tabIndex={1}
      >
        Skip to Content
      </Link>
      <Announcement
        text={menus.banner_text}
        locales={locales}
        global={global}
      />
      <div className="sticky top-0 z-50 ">
        <Header
          menus={menus}
          logo={global.site_logo}
          slices={menus.slices}
          locales={locales}
        />
      </div>
      <main id="main-content" className="relative focus:outline-0" tabIndex={0}>
        {children}
      </main>
      <NewsletterSignupBanner lang={"en-ca"} />
      <Footer global={global} slices={menus?.slices1} footerData={menus} />
    </div>
  );
};
