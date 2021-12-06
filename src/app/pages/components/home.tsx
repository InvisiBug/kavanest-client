import React, { useLayoutEffect, useState } from "react";
import { makeRequest } from "../../utils";
import { Sensor } from "../../orgamisms";

const Sensors: React.FC = () => {
  const [data, setData] = useState<any | null | void>(null);

  useLayoutEffect(() => {
    makeRequest(query).then(setData);
  }, []);

  if (!data) return <></>;

  return (
    <>
      <h1>Sensors</h1>
      <p>Heating may be on, I've no idea</p>

      {data.getAllSensors.map((sensor: any) => {
        return <Sensor sensor={sensor} key={Math.random()}></Sensor>;
      })}
    </>
  );
};

export default Sensors;

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
