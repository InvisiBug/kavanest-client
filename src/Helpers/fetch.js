// const controllerAddress = "http://192.168.1.46"; // Production
const controllerAddress = "http://localhost:5000"; // Development

export const apiFetch = async (point) => {
  // console.log(point);
  fetch(`${controllerAddress}${point}`);
  // let response = await fetch(`${controllerAddress}${point}`);
  // try {
  //   return await response.json();
  // } catch {
  //   return null;
  // }
};

export const apiPost = async (point, body) => {
  let response = await fetch(`${controllerAddress}${point}`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(body),
  });
  try {
    return await response.json();
  } catch {
    return null;
  }
};
