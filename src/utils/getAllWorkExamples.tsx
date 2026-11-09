import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/prismicio";
import { WorkExampleDocument } from "../../prismicio-types";

const fetchData = async (lang: string) => {
  const client = createClient();
  const response = await client.getAllByType("work_example", { lang });
  return response as WorkExampleDocument[];
};

const useAllWorkExamples = (lang: string) => {
  return useQuery({
    queryKey: [`work-example-${lang}`],
    queryFn: () => fetchData(lang),
  });
};

export default useAllWorkExamples;
