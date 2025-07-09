import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/prismicio";
import { ServiceDocument } from "../../prismicio-types";

const fetchData = async (lang: string) => {
  const client = createClient();
  const response = await client.getAllByType("service", { lang });
  return response as ServiceDocument[];
};

const GetAllServices = (lang: string) => {
  return useQuery({
    queryKey: [`service-${lang}`],
    queryFn: () => fetchData(lang),
  });
};

export default GetAllServices;
