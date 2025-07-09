import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/prismicio";
import { InsightDocument } from "../../prismicio-types";

const fetchData = async (lang: string) => {
  const client = createClient();
  const response = await client.getAllByType("insight", { lang });
  return response as InsightDocument[];
};

const GetAllInsights = (lang: string) => {
  return useQuery({
    queryKey: [`insight-${lang}`],
    queryFn: () => fetchData(lang),
  });
};

export default GetAllInsights;
