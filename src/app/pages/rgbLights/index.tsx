import React, { useState } from "react";
import { PageTitle } from "../../lib";
import { useQuery, gql } from "@apollo/client";
import RoomSelector from "./components/roomSelector";

const RGBLights: React.FC<any> = () => {
  const { loading, error, data } = useQuery(getLights, { fetchPolicy: "no-cache" });
  const [openRGBLight, setOpenRGBLight] = useState("");

  if (loading) return <></>;
  if (error) return <></>;

  return (
    <>
      <PageTitle desc={"Some of these lights have alternative modes"}>RGB Lights</PageTitle>
      {data.lights.map((light: any) => {
        return <RoomSelector lightData={light} openRGBLight={openRGBLight} setOpenRGBLight={setOpenRGBLight} key={Math.random()} />;
      })}
    </>
  );
};

export default RGBLights;

const getLights = gql`
  query {
    lights: getRGBLights {
      name
    }
  }
`;
