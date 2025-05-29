"use client";

import React, { ReactNode, useEffect } from "react";
import {
  GlobalDocumentData,
  MenusDocumentData,
} from "../../../prismicio-types";
import { PrismicDocument } from "@prismicio/client";

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
      <a href="#main-content" className="skip-to-content-link">
        Skip to Content
      </a>
      <div className="sticky top-0 z-50 ">
        {/* <TopBar locales={locales} global={global} text={menus.banner_text} />
        <Header
          logo={global.site_logo}
          slices={menus.slices}
          locales={locales}
        /> */}
      </div>
      <main id="main-content" className="relative focus:outline-0" tabIndex={0}>
        {children}
      </main>
      {/* <Footer global={global} slices={menus?.slices1} footerData={menus} /> */}
    </div>
  );
};
