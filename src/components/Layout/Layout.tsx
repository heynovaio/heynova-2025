"use client";

import React, { ReactNode, useEffect } from "react";
import {
  GlobalDocumentData,
  MenusDocumentData,
} from "../../../prismicio-types";
import { PrismicDocument } from "@prismicio/client";
import { Announcement, Footer, Header } from "../Menu";

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
  
  console.log("Locales: ", locales);
  return (
    <div>
      {/* <a href="#main-content" className="skip-to-content-link">
        Skip to Content
      </a> */}
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
      <Footer global={global} slices={menus?.slices1} footerData={menus} />
    </div>
  );
};
