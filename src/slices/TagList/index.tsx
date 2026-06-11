import { FC } from "react";
import { Content, KeyTextField, RichTextField } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Container, ContentBox, Section } from "@/components";
import Link from "next/link";

export type TagListProps = SliceComponentProps<Content.TagListSlice>;

interface SectorItem {
  sector: {
    url?: string;
    slug?: string;
    data?: { title?: RichTextField | string };
  };
}

interface ServiceItem {
  service: {
    url?: string;
    slug?: string;
    data?: { title?: RichTextField | string; tagline?: KeyTextField };
  };
}

function getTitle(item: {
  url?: string;
  slug?: string;
  data?: { title?: RichTextField | string };
}): string {
  const title = item.data?.title;
  if (typeof title === "string" && title) return title;
  if (Array.isArray(title) && title.length > 0) {
    const firstNode = title[0] as { text?: string };
    if (firstNode?.text) return firstNode.text;
  }
  return item.slug ?? "";
}

const TagList: FC<TagListProps> = ({ slice, context }) => {
  const services = (context as any).services as ServiceItem[] | undefined;
  const sectors = (context as any).sectors as SectorItem[] | undefined;

  const hasSectors = sectors && sectors.length > 0;
  const hasServices = services && services.length > 0;

  return (
    <Section>
      <Container>
        {slice.primary.title && (
          <div className="flex flex-col gap-6 items-center text-center w-full">
            <PrismicRichText
              field={slice.primary.title}
              components={{
                heading2: ({ children }) => (
                  <h2 className="text-aqua">{children}</h2>
                ),
              }}
            />

            <div className="text-bodyLarge max-w-[70ch]">
              <PrismicRichText
                field={slice.primary.body}
                components={{
                  paragraph: ({ children }) => (
                    <p className="!mx-0">{children}</p>
                  ),
                }}
              />
            </div>

            {(hasSectors || hasServices) && (
              <div className="flex flex-wrap gap-2 justify-center">
                {hasSectors &&
                  sectors!.map((item, index) => (
                    <Link
                      key={`sector-${index}`}
                      href={item.sector.url ?? "#"}
                      className="btn btn-teal"
                    >
                      {getTitle(item.sector)}
                    </Link>
                  ))}
                {hasServices &&
                  services!.map((item, index) => (
                    <Link
                      key={`service-${index}`}
                      href={item.service.url ?? "#"}
                      className="btn btn-wine"
                    >
                      {getTitle(item.service)}
                    </Link>
                  ))}
              </div>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
};
export default TagList;
