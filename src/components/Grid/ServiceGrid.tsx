"use client";
import React from "react";
import { Container, Section } from "../Layout";
import { Grid } from "./Grid";
import { GeneralCard } from "../Cards";
import { asText } from "@prismicio/client";
import { useAllServicesData } from "@/hooks/use-all-services-data";

interface ServiceGridProps {
  lang: string;
}

export const ServiceGrid = ({ lang }: ServiceGridProps) => {
  const { servicesData } = useAllServicesData(lang || "en-ca");
  return (
    <Section data-testid="insight-listing-grid">
      <Container>
        <div className="my-8 md:mb-16">
          <Grid maxColumns={3}>
            {servicesData?.map((item, index) => {
              const data = item?.data;
              return (
                <GeneralCard
                  key={index}
                  href={item.url || "#"}
                  image={data.meta_image}
                  title={data.meta_title || asText(data.title) || "Untitled"}
                  titleLevel={3}
                  description={data.meta_description || data.body}
                  tags={item?.tags}
                />
              );
            })}
          </Grid>
        </div>
      </Container>
    </Section>
  );
};
