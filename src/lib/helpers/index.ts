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
