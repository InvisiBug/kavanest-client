import React from "react";
import Sensor from "../components/sensor";

const ResponseBox: React.FC<Props> = ({ data }) => {
  if (!data) return <></>;

  return (
    <>
      {data.getAllSensors.map((sensor: any) => {
        return <Sensor sensor={sensor} key={Math.random()}></Sensor>;
      })}

      <div style={{ color: "white" }}>
        <pre style={{ overflowWrap: "break-word" }}>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </>
  );
};

export default ResponseBox;

export type Props = {
  data: any;
};
