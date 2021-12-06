import Axios from "axios";
require("dotenv").config();

const environment: string = process.env.REACT_APP_ENVIRONMENT ?? "";

console.log(environment);
let apiUrl: string = "";

switch (environment) {
  case "live":
    apiUrl = process.env.REACT_APP_API_LIVE ?? "";
    break;

  case "test":
    apiUrl = process.env.REACT_APP_API_TEST ?? "";
    break;

  case "local":
    apiUrl = process.env.REACT_APP_API_LOCAL ?? "";
    break;

  case "docker":
    apiUrl = process.env.REACT_APP_API_DOCKER ?? "";
    break;
}

export const makeRequest = async (query: string) => {
  const data = await Axios.post(apiUrl, { query }).then((response) => {
    return response.data.data;
  });

  return data;
};

export const asyncRequest = async (query: string, datapoint: any) => {
  await Axios.post(apiUrl, { query }).then((response) => {
    datapoint(response.data.data.response);
  });
};

export const decamelize = (text: string) => {
  const result = text.replace(/([A-Z]{1,})/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

export { default as AppContext } from "./context";
export { AppProvider } from "./context";
export { useAppContext } from "./context";
