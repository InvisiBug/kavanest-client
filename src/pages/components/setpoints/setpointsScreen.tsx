import React from "react";
// import RoomScreen from "./components/roomScreen";
import { RoomHeating } from "src/lib/components";
import { useQuery, gql } from "@apollo/client";
import SelectorScreen from "./components/selectorScreen";
import { Plug } from "src/lib/gqlTypes";
import { Routes, Route } from "react-router-dom";

const SetpointsScreen: React.FC = () => {
  const { data } = useQuery<GraphqlResponse>(getValves, {
    fetchPolicy: "no-cache",
  });

  if (!data) return <></>;

  return (
    <Routes>
      <Route path="/" element={<SelectorScreen setRoomToShow={null} />} />

      {data?.radiators?.map(({ name }) => {
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
  radiators: Plug[];
};
