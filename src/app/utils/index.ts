import Axios from "axios";
import { apiUrl } from "./urlGen";

export const makeRequest = async (query: string, variables: any = null) => {
  const data = await Axios.post(apiUrl, { query, variables }).then((response) => {
    return response.data.data;
  });

  return data;
};

export const asyncRequest = async (query: string, datapoint: any, variables: any = null) => {
  await Axios.post(apiUrl, { query, variables }).then((response) => {
    datapoint(response.data.data.response);
    return response;
  });
};

export const decamelize = (text: string) => {
  if (!text) return "Unknown Name, probs something wrong with mongo";
  const result = text.replace(/([A-Z]{1,})/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

export { default as AppContext, AppProvider, useAppContext } from "./context";
export { apiUrl };
