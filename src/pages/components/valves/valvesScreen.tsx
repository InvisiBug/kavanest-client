import React, { useState } from "react";
import { PageTitle, PageContents, PlugSelector, ValveSelector } from "../../../lib";
import { useQuery, gql } from "@apollo/client";

const Valves = () => {
  const [valves, setValves] = useState<any>();

  const { data } = useQuery(getValves, {
    fetchPolicy: "no-cache",
    onCompleted() {
      setValves(data.valves);
    },
  });

  if (!valves) return <></>;

  return (
    <>
      <PageTitle desc={"Current valve states"}>Valves</PageTitle>
      <PageContents>
        {valves!.map((valve: any) => {
          return <ValveSelector thisValve={valve} margin={false} key={Math.random()} />;
          // return <PlugSelector thisPlug={valve} key={Math.random()} />;
        })}
      </PageContents>
    </>
  );
};

export default Valves;

const getValves = gql`
  query {
    valves: getValves {
      # name: room
      room
      connected
      state
      _id
    }
  }
`;
