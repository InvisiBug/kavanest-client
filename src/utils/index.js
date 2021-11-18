import Axios from "axios";

export const makeRequest = async (query) => {
  const data = await Axios.post(process.env.REACT_APP_URL ?? "", { query }).then((response) => {
    return response.data.data;
  });

  return data;
};
