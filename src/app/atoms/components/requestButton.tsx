import React, { useLayoutEffect } from "react";
import Button from "./button";
import { makeRequest } from "../../utils";

const RequestButton: React.FC<Props> = ({ setData }) => {
  useLayoutEffect(() => {
    // makeRequest(query).then(setData);
  }, []);

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

const query: string = `
  query GetAllSensors {
    getAllSensors {
      room
      rawTemperature
      temperature
      humidity
      offset
      connected
    }
  }
`;

export type Props = {
  setData: (data: any) => void;
};
