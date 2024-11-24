import React, { useState } from "react";
// import RoomScreen from "./components/roomScreen";
import { RoomHeating } from "@/lib/components";
import { useQuery, gql } from "@apollo/client";
import SelectorScreen from "./selectorScreen";
import { Plug, Radiator } from "@/lib/gqlTypes";
import { Routes, Route } from "react-router-dom";
import Thermometer from "@/lib/components/thermometer";

const SetpointsScreen: React.FC = () => {
  const [openRoom, setOpenRoom] = useState<string | undefined>(undefined);
  console.log("🚀 ~ openRoom:", openRoom);

  const { data, error } = useQuery<GraphqlResponse>(getValves, {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  });

  console.log("GHesadkljh");

  if (error) console.log(error);

  if (!data) return <></>;
  const { radiators } = data;

  // console.log(data);

  return (
    // <Routes>
    //   <Route path="/" element={<SelectorScreen />} />
    <>
      {openRoom == undefined ? <SelectorScreen setOpenRoom={setOpenRoom} /> : <RoomHeating name={openRoom} close={() => setOpenRoom(undefined)} />}
      {/* <SelectorScreen setOpenRoom={setOpenRoom} /> */}

      {/* {radiators.map(({ name }) => {
        return <Route path={`setpoints/${name}`} element={<RoomHeating name={name} />} key={name} />;
      })} */}
      {/* <Thermometer /> */}
    </>
    // </Routes>
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
