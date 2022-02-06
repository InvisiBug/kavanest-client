import React, { useState } from "react";
import { PageTitle, SelectorContainer } from "../../lib";
import { useQuery, gql } from "@apollo/client";
import RoomSelector, { PlugData } from "./components/roomSelector";

const Valves = () => {
  const [valves, setValves] = useState<PlugData[]>();

  const { data } = useQuery(getValves, {
    fetchPolicy: "no-cache",
    onCompleted() {
      setValves(data.valves);
      console.log(data.valves);
    },
  });

  return (
    <>
      <h1>valves</h1>
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
