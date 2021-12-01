import Axios from "axios";

export const makeRequest = async (query: string) => {
  const data = await Axios.post(process.env.REACT_APP_URL ?? "", { query }).then((response) => {
    return response.data.data;
  });

  return data;
};

export const asyncRequest = async (query: string, datapoint: any) => {
  await Axios.post(process.env.REACT_APP_URL ?? "", { query }).then((response) => {
    datapoint(response.data.data.response);
  });
};

export const decamelize = (text: string) => {
  const result = text.replace(/([A-Z]{1,})/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};
