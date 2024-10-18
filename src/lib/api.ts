import { weekOrWeekend, now } from "src/lib/helpers";
import Axios from "axios";
// require("dotenv").config();

export const apiUrl = process.env.REACT_APP_API ?? "";
export const socketUrl = process.env.REACT_APP_SOCKET ?? "";

console.log(apiUrl, socketUrl);

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

export const getCurrentSetpoint = (setpoints: any) => {
  // console.log(setpoints);
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
    return [undefined, undefined];
  }
};
