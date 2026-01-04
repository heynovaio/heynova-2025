import { PrismicRichText } from "@prismicio/react";
import React, { ReactNode } from "react";
import clsx from "clsx";
import { getWidthClassNames, WidthProp } from "@/utils";
import { RichTextField } from "@prismicio/client";

interface ContentBoxProps {
  children?: ReactNode;
  title?: string | RichTextField | undefined;
  tagline?: string;
  titleClassName?: string;
  content?: ReactNode | undefined;
  buttons?: ReactNode[];
  width?: WidthProp;
  containerClassName?: string;
  titleComponents?: {
    [key: string]: React.FC<{ children: ReactNode }>;
  };
  titleLevel?: 2 | 3; // New prop to control heading level
  smallerTextWidth?: boolean;
}

export const ContentBox: React.FC<ContentBoxProps> = ({
  children,
  title,
  tagline,
  titleClassName,
  content,
  buttons,
  width = "full",
  containerClassName,
  titleComponents,
  titleLevel = 2,
  smallerTextWidth = false,
  ...props
}) => {
  const widthClassName = getWidthClassNames(width);
  const textWidth = smallerTextWidth ? "max-w-[80ch]" : "";

  const TitleHeading = ({ children }: { children: ReactNode }) => {
    return titleLevel === 2 ? (
      <h2 className={titleClassName}>
        {children}
      </h2>
    ) : (
      <h3 className={titleClassName}>
        {children}
      </h3>
    );
  };

  // Create heading components for PrismicRichText
  const animatedHeadingComponents = {
    ...titleComponents,
    heading2: ({ children }: { children: ReactNode }) => {
      const CustomHeading2 = titleComponents?.heading2;
      if (CustomHeading2) {
        return <CustomHeading2>{children}</CustomHeading2>;
      }
      return (
        <h2 className={titleClassName}>
          {children}
        </h2>
      );
    },
    heading3: ({ children }: { children: ReactNode }) => {
      const CustomHeading3 = titleComponents?.heading3;
      if (CustomHeading3) {
        return <CustomHeading3>{children}</CustomHeading3>;
      }
      return (
        <h3 className={titleClassName}>
          {children}
        </h3>
      );
    },
  };

  return (
    <div
      data-test-id="contentbox"
      className={clsx(
        `flex flex-col gap-7 contentBox `,
        widthClassName,
        containerClassName
      )}
      {...props}
    >
      <div className={`flex flex-col w-full gap-2 ${textWidth}`}>
        <div className={titleClassName}>
          {tagline && <div className="text-bodyLarge">{tagline}</div>}
          {typeof title === "string" ? (
            <TitleHeading>{title}</TitleHeading>
          ) : (
            <PrismicRichText field={title} components={animatedHeadingComponents} />
          )}
        </div>
        {content && <div className="text-content">{content}</div>}
      </div>
      {buttons && buttons.length > 0 && (
        <div className="flex gap-6">{buttons}</div>
      )}
      {children}
    </div>
  );
};
