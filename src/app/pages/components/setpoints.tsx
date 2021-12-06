import React, { useLayoutEffect, useState } from "react";
import { SetpointRequest } from "../../orgamism";
import { asyncRequest } from "../../utils";

const Setpoints: React.FC = () => {
  const [data, setData] = useState<any | null | void>(null);

  useLayoutEffect(() => {
    asyncRequest(query, setData);
  }, []);

  if (!data) return <></>;

  return (
    <>
      <h1>Hello from setpoints</h1>
      <SetpointRequest />
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
