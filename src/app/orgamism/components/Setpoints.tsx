import React, { useLayoutEffect, useState } from "react";
import { asyncRequest } from "../../utils";
import Offset from "./offset";

const Setpoints: React.FC = () => {
  const [data, setData] = useState<any | null | void>(null);

  useLayoutEffect(() => {
    asyncRequest(query, setData);
  }, []);

  if (!data) return <></>;

  return (
    <>
      {data.map((sensor: any) => {
        return <Offset data={sensor} key={Math.random()}></Offset>;
      })}

      <div style={{ color: "white" }}>
        <pre style={{ overflowWrap: "break-word" }}>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </>
  );
};

export default Setpoints;

const query: string = `
  query GetAllSetpoints {
    response:getAllSetpoints {
      room
      setpoints
    }
  }
`;
