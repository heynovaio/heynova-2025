"use client";

import GetAllServices from "@/utils/getAllServices";

/*** 
This is the data handling hook for categories. Data is the response filled with every category page in the language specified. Error is the error message if the request fails. Do all the data handling for categories here like type conversions and useStates.
***/
export const useAllServicesData = (lang: string) => {
  const { data: servicesData, error } = GetAllServices(lang);
  return {
    servicesData,
    error,
  };
};
