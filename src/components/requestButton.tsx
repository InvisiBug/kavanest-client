import Button from "../lib/button";
import { makeRequest } from "../utils";

const RequestButton: React.FC<Props> = ({ setData }) => {
  return (
    <>
      <div>
        <Button
          handleClick={async () => {
            setData(await makeRequest(query));
          }}
        >
          Make request
        </Button>
      </div>
    </>
  );
};

export default RequestButton;

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
