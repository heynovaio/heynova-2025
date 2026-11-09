import React from "react";
import type { BandPosition } from "@/utils/angledBand";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  styling?: string;
  props?: React.HTMLAttributes<HTMLDivElement>;
  isBlogPage?: boolean;
  /** Position in an angled background band, from getBandPosition(). */
  band?: BandPosition;
}
export const Section: React.FC<SectionProps> = ({
  children,
  styling,
  isBlogPage = false,
  band = "none",
  ...props
}) => {
  const verticalPadding = isBlogPage ? "py-6 print:my-0" : "py-8 md:py-16  ";
  const hasBand = band !== "none" && !isBlogPage;
  return (
    // Vertical Padding
    <section
      className={`${verticalPadding} print:py-0 print:my-0 w-full ${
        hasBand ? `angled-section angled-section--${band}` : ""
      } ${styling ?? ""}`}
      {...props}
    >
      {hasBand && (
        <div
          aria-hidden="true"
          className={`angled-band angled-band--${band}`}
        />
      )}
      {children}
    </section>
  );
};
