import Axios from "axios";
require("dotenv").config();
// import { apiUrl } from "./urlGen";

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
export const apiUrl = process.env.REACT_APP_API ?? "";
export const socketUrl = process.env.REACT_APP_SOCKET ?? "";

export const weekOrWeekend = () => {
  var today = new Date();
  if (!(today.getDay() % 6)) return "weekend";
  else return "weekday";
};

export const getCurrentSetpoint = (setpoints: any) => {
  let setpoint;

  Object.keys(setpoints[weekOrWeekend()]).forEach((entry) => {
    if (now() > entry) {
      setpoint = setpoints[weekOrWeekend()][entry];
    }
  });
  return setpoint;
};

export const now = () => {
  const date = new Date();
  return date.toLocaleTimeString([], {
    hourCycle: "h23",
    hour: "2-digit",
    minute: "2-digit",
  });
};
