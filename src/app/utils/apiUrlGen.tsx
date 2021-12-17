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

export { apiUrl };
