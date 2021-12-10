import React, { useLayoutEffect, useState } from "react";
import { asyncRequest } from "../../utils";
import { Sensor } from "../../orgamisms";
import { PageTitle } from "../../atoms";

const Sensors: React.FC = () => {
  const [data, setData] = useState<any | null | void>(null);
  const [heating, setHeating] = useState<any | null | void>(null);

  useLayoutEffect(() => {
    asyncRequest(getSensors, setData);
    asyncRequest(getHeating, setHeating, heatingVariables);
    if (data) console.log(data);
  }, []); // eslint-disable-line

  if (!data || heating === undefined) return <></>;

  return (
    <>
      <PageTitle desc={`Heating is probably ${heating ? "on" : "off"}, I've no idea`}>Sensors</PageTitle>

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