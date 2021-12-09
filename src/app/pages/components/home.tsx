import React, { useLayoutEffect, useState } from "react";
import { asyncRequest } from "../../utils";
import { Sensor } from "../../orgamisms";

const Sensors: React.FC = () => {
  const [data, setData] = useState<any | null | void>(null);
  const [heating, setHeating] = useState<any | null | void>(null);

  useLayoutEffect(() => {
    asyncRequest(getSensors, setData);
    asyncRequest(getHeating, setHeating, heatingVariables);
    if (data) console.log(data);
  }, []);

  if (!data) return <></>;
  if (heating === undefined) return <></>;

  return (
    <>
      <h1>Sensors</h1>
      <p>Heating is probably {heating ? "on" : "off"}, I've no idea</p>

      {data.map((sensor: any) => {
        return <Sensor sensor={sensor} key={Math.random()}></Sensor>;
      })}
    </>
  );
};

export default Sensors;

const getSensors: string = `
  query GetAllSensors {
    response:getAllSensors {
      room
      rawTemperature
      temperature
      humidity
      offset
      connected
    }
  }
`;

const getHeating: string = `
  query GetPlug($name: String) {
    response:getPlug(name: $name) {
      state
    }
  },
  `;

const heatingVariables = {
  name: "heating",
};
