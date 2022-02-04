import Axios from "axios";
require("dotenv").config();

export { default as AppContext, AppProvider, useAppContext } from "./context";
export const apiUrl = process.env.REACT_APP_API ?? "";
export const socketUrl = process.env.REACT_APP_SOCKET ?? "";

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

export const weekOrWeekend = () => {
  var today = new Date();
  if (!(today.getDay() % 6)) return "weekend";
  else return "weekday";
};

export const getCurrentSetpoint = (setpoints: any) => {
  console.log(setpoints);
  let setpoint: number | null = null;
  let count: number = 0;
  try {
    Object.keys(setpoints[weekOrWeekend()]).forEach((entry) => {
      if (now() > entry) {
        setpoint = setpoints[weekOrWeekend()][entry];
      }
      count++;
    });
    const obj = setpoints[weekOrWeekend()];

    if (!setpoint) return parseInt(obj[Object.keys(obj)[count - 1]]);

    return setpoint;
  } catch {
    return null;
  }
};

export const getCurrentSetpointV2 = (setpoints: any) => {
  let setpoint: number | null = null;
  let time: string = "";

  try {
    Object.keys(setpoints[weekOrWeekend()]).forEach((entry) => {
      if (now() > entry) {
        setpoint = setpoints[weekOrWeekend()][entry];
        time = entry;
      }
    });
    const obj = setpoints[weekOrWeekend()];

    var lastTime = Object.keys(obj).sort().reverse()[0];
    var lastSetpoint = obj[lastTime];

    if (!setpoint) return [lastTime, lastSetpoint];

    return [time, setpoint];
  } catch {
    return null;
  }
};

export const now = () => {
  const date = new Date();
  return date.toLocaleTimeString([], {
    hourCycle: "h23",
    hour: "2-digit",
    minute: "2-digit",
  });
};
