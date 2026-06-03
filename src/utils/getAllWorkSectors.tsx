import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/prismicio";
import { WorkSectorDocument } from "../../prismicio-types";

const fetchData = async (lang: string) => {
  const client = createClient();
  const response = await client.getAllByType("work_sector", { lang });
  return response as WorkSectorDocument[];
};

const GetAllWorkSectors = (lang: string) => {
  return useQuery({
    queryKey: [`work-sector-${lang}`],
    queryFn: () => fetchData(lang),
  });
};

export default GetAllWorkSectors;
