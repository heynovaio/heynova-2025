import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/prismicio";
import { InsightsCategoriesDocument } from "../../prismicio-types";

const fetchData = async (lang: string) => {
  const client = createClient();
  const response = await client.getAllByType("insights_categories", { lang });
  return response as InsightsCategoriesDocument[];
};

const GetAllInsightCategories = (lang: string) => {
  return useQuery({
    queryKey: [`insight-categories-${lang}`],
    queryFn: () => fetchData(lang),
  });
};

export default GetAllInsightCategories;
