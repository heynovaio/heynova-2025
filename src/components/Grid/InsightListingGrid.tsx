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

interface InsightListingGridProps {
  lang: string;
}

export const InsightListingGrid = ({ lang }: InsightListingGridProps) => {
  const { insightsData } = useAllInsightsData(lang || "en-ca");
  const { data: insightCategories } = GetAllInsightCategories(lang || "en-ca");

  // Function to find matching category for an insight
  const findMatchingCategory = (insightCategories: any[], insightData: any) => {
    if (
      !insightCategories ||
      !insightData?.categories ||
      insightData.categories.length === 0
    ) {
      return null;
    }

    // Get the first category from the insight's categories array
    const firstInsightCategory = insightData.categories[0];

    if (!firstInsightCategory?.name?.id) {
      return null;
    }

    // Find the matching category by ID
    const matchingCategory = insightCategories.find(
      (category) => category.id === firstInsightCategory.name.id
    );

    return matchingCategory || null;
  };

  // Function to construct the URL for an insight
  const getInsightUrl = (insight: any) => {
    const matchingCategory = findMatchingCategory(
      insightCategories || ["Other"],
      insight.data
    );

    if (matchingCategory && matchingCategory.url) {
      return `${matchingCategory.url}/${insight.uid}`;
    }

    // Fallback to original URL or a default path
    return insight.url || `#`;
  };

  return (
    <Section data-testid="insight-listing-grid">
      <Container>
        <div className="my-8 md:mb-16">
          <Grid maxColumns={3}>
            {insightsData?.map((item, index) => {
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
