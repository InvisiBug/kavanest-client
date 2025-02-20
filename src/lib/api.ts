import { weekOrWeekend, now } from "@/lib/helpers";
import Axios from "axios";
import { time } from "console";
// require("dotenv").config();
const env = import.meta.env;

export const apiUrl = env.VITE_API ?? "";
console.log("🚀 ~ apiUrl:", apiUrl);
export const socketUrl = env.VITE_SOCKET ?? "";
console.log("🚀 ~ socketUrl:", socketUrl);

// export const apiUrl = "https://api.kavanet.io";
// export const socketUrl = "https://test.socket.kavanet.io";

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

    const lastTime = Object.keys(obj).sort().reverse()[0];
    const lastSetpoint = obj[lastTime];

    if (!setpoint) return [lastTime, lastSetpoint];

    return [time, setpoint];
  } catch {
    return [undefined, undefined];
  }
};

export const getCurrentSetpointV3 = (setpoints: {
  weekend: Record<string, { temp: number; type: string }>;
  weekday: Record<string, { temp: number; type: string }>;
}) => {
  const setpoint = {} as Setpoint;

  try {
    Object.keys(setpoints[weekOrWeekend()]).forEach((time) => {
      if (now() > time) {
        setpoint.temp = setpoints[weekOrWeekend()][time].temp;
        setpoint.type = setpoints[weekOrWeekend()][time].type;
        setpoint.time = time;
      }
    });

    if (!setpoint.time) {
      const obj = setpoints[weekOrWeekend()];
      const lastTime = Object.keys(obj).sort().reverse()[0];
      const lastSetpoint = obj[lastTime];

      return {
        time: lastTime,
        temp: lastSetpoint.temp,
        type: lastSetpoint.type,
      };
    }

    return setpoint;
  } catch {
    return setpoint;
  }
};

export type Setpoint = {
  time: string;
  temp: number;
  type: string;
};
