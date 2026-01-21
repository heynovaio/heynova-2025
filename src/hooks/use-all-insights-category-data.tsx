"use client";
import GetAllInsightCategories from "@/utils/getAllInsightCategories";

/*** 
This is the data handling hook for categories. Data is the response filled with every category page in the language specified. Error is the error message if the request fails. Do all the data handling for categories here like type conversions and useStates.
***/
export const useInsightCategoryData = (lang: string) => {
  const { data: insightCategoryData, error } = GetAllInsightCategories(lang);
  return {
    insightCategoryData,
    error,
  };
};
