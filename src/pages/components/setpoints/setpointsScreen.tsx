import React from "react";
// import RoomScreen from "./components/roomScreen";
import { RoomHeating } from "@/lib/components";
import { useQuery, gql } from "@apollo/client";
import SelectorScreen from "./selectorScreen";
import { Plug, Radiator } from "@/lib/gqlTypes";
import { Routes, Route } from "react-router-dom";

const SetpointsScreen: React.FC = () => {
  const { data, error } = useQuery<GraphqlResponse>(getValves, {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  });

  console.log(error)

  if (!data) return <></>;
  const { radiators } = data;

  // console.log(data);

  return (
    <Routes>
      <Route path="/" element={<SelectorScreen />} />

      {radiators.map(({ name }) => {
        return <Route path={`setpoints/${name}`} element={<RoomHeating name={name} />} key={name} />;
      })}
    </Routes>
  );
};

export default SetpointsScreen;

const getValves = gql`
  query {
    radiators: getRadiators {
      name
    }
  }
`;

type GraphqlResponse = {
  radiators: Radiator[];
};
