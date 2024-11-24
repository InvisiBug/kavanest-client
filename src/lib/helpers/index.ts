import { format } from "path";

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

export const now = () => {
  const date = new Date();
  return date.toLocaleTimeString([], {
    hourCycle: "h23",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const rgbToArray = (rgb: string) => {
  return rgb
    .split("(")[1]
    .split(")")[0]
    .split(",")
    .map((x: string) => {
      return parseInt(x);
    });
};

export const formatTime = (hh: number, mm: number, ss: number) => {
  const hours = hh > 0 ? `${hh}:` : "";
  const minutes = ("0" + mm).slice(-2);
  const seconds = ("0" + ss).slice(-2);
  return `${hours}${minutes}:${seconds}`;
};

export const calcTimeDifference = (now: number, timer: number) => {
  const difference = timer - now;
  // console.log(difference);

  if (difference < -1) return `${-1}:${difference}`; // Handles the bed being off

  let msec = difference;

  const hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  const mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  const ss = Math.floor(msec / 1000);
  msec -= ss * 1000;

  if (hh > 50) return "lol";

  //Couldnt figure out how to hide zero hours
  // return `${hh > 0 ? ("0" + hh).slice(-2) : ""}:${("0" + mm).slice(-2)}:${("0" + ss).slice(-2)}`;
  return `${("0" + hh).slice(-2)}:${("0" + mm).slice(-2)}:${("0" + ss).slice(-2)}`;
  // return formatTime(hh, mm, ss);
};

export const isTimeLeft = (hours: string, mins: string, secs: string): boolean => {
  const h = parseInt(hours, 10);
  const m = parseInt(mins, 10);
  const s = parseInt(secs, 10);

  return (h > 0 || m > 0 || s > 0) && !isNaN(h) && !isNaN(m) && !isNaN(s);
};
