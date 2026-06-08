import { FC } from "react";
import { Content, isFilled, asText } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Container, Section } from "@/components/Layout";
import { Grid } from "@/components/Grid/Grid";
import { GeneralCard } from "@/components/Cards";

export type ServicesGridProps = SliceComponentProps<Content.ServicesGridSlice>;

const ServicesGrid: FC<ServicesGridProps> = ({ slice }) => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Container>
        <div className="my-8 md:mb-16">
          <Grid maxColumns={3}>
            {(slice.primary.services || []).map((item, index) => {
              const service = item.service;
              if (!isFilled.contentRelationship(service) || !service.data)
                return null;

              const data = service.data as {
                title?: any;
                body?: any;
                meta_title?: string;
                meta_description?: string;
                meta_image?: any;
              };

              return (
                <GeneralCard
                  key={index}
                  href={service.url || "#"}
                  // image={data.meta_image}
                  title={data.meta_title || asText(data.title) || "Untitled"}
                  titleLevel={3}
                  description={data.meta_description || data.body}
                />
              );
            })}
          </Grid>
        </div>
      </Container>
    </Section>
  );
};

export default ServicesGrid;
