import React, { useState } from "react";
import { PageTitle, PageContents } from "../../lib";
import { useQuery, gql } from "@apollo/client";
import RoomSelector from "./components/roomSelector";

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
          return <RoomSelector thisValve={valve} key={Math.random()} />;
        })}
      </PageContents>
    </>
  );
};

export default Valves;

const getValves = gql`
  query {
    valves: getValves {
      room
      connected
      state
      _id
    }
  }
`;
