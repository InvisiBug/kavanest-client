import Axios from "axios";

const MakeRequest: React.FC<Props> = ({ setData }) => {
  return (
    <>
      <button
        onClick={async () => {
          setData(await makeRequest());
        }}
      >
        Make request
      </button>
    </>
  );
};

export default MakeRequest;

const makeRequest = async () => {
  // const url: string = "http://localhost:4000/";
  const url = "https://api.kavanet.io/";

  const test = await Axios.post(url, { query }).then((response) => {
    return response.data.data;
  });

  return test;
};

const query = `
  query GetAllSensors {
    getAllSensors {
      room
      rawTemperature
      temperature
      humidity
      connected
    }
  }
`;
export type Props = {
  setData: (data: any) => void;
};
