import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  styling?: string;
  props?: React.HTMLAttributes<HTMLDivElement>;
  isBlogPage?: boolean;
}
export const Section: React.FC<SectionProps> = ({
  children,
  styling,
  isBlogPage = false,
  ...props
}) => {
  const verticalPadding = isBlogPage ? "py-6 print:my-0" : "py-8 md:py-16  ";
  return (
    // Vertical Padding
    <section
      className={`${verticalPadding} print:py-0 print:my-0 w-full ${styling}`}
      {...props}
    >
      {children}
    </section>
  );
};
