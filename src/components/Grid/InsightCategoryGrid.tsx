/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAllInsightsData } from "@/hooks/use-all-insights-data";
import React from "react";
import { Container, Section } from "../Layout";
import { Grid } from "./Grid";
import { GeneralCard } from "../Cards";
import Link from "next/link";
import { asText } from "@prismicio/client";
import GetAllInsightCategories from "@/utils/getAllInsightCategories";

interface InsightCategoryGridProps {
  lang: string;
  categoryId: string;
}

export const InsightCategoryGrid = ({
  lang,
  categoryId,
}: InsightCategoryGridProps) => {
  const { insightsData } = useAllInsightsData(lang || "en-ca");
  const { data: insightCategories } = GetAllInsightCategories(lang || "en-ca");

  const getInsightUrl = (insight: any) => {
    const currentCategory = insightCategories?.find(
      (category) => category.id === categoryId
    );

    if (currentCategory && currentCategory.url) {
      return `${currentCategory.url}/${insight.uid}`;
    }

    return insight.url || `#`;
  };

  // Filter insights that match the specific category ID
  const filteredInsights = insightsData?.filter((insight) => {
    if (!insight.data?.categories || insight.data.categories.length === 0) {
      return false;
    }

    // Check if any of the insight's categories match the provided categoryId
    return insight.data.categories.some(
      (category: any) => category.name?.id === categoryId
    );
  });

  return (
    <Section data-testid="insight-category-grid">
      <Container>
        <div className="my-8 md:mb-16">
          <Grid maxColumns={3}>
            {filteredInsights?.map((item, index) => {
              const data = item?.data;
              const insightUrl = getInsightUrl(item);

              return (
                <Link href={insightUrl} key={index}>
                  <GeneralCard
                    image={data.meta_image}
                    title={data.meta_title || asText(data.title) || "Untitled"}
                    titleLevel={3}
                    description={data.meta_description || data.body}
                    tags={item?.tags}
                  />
                </Link>
              );
            })}
          </Grid>
        </div>
      </Container>
    </Section>
  );
};
