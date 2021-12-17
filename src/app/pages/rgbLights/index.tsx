import React from "react";
import { PageTitle } from "../../lib";
import { useQuery, gql } from "@apollo/client";
import RoomSelector from "./components/roomSelector";

const RGBLights: React.FC<any> = () => {
  const { loading, error, data } = useQuery(getLights, { fetchPolicy: "no-cache" });

  if (loading) return <></>;
  if (error) return <></>;

  // console.log(data.lights);

  return (
    <>
      <PageTitle desc={"Some of these lights have alternative modes"}>RGB Lights</PageTitle>
      {data.lights.map((light: any) => {
        return <RoomSelector lightData={light} key={Math.random()} />;
      })}
    </>
  );
};

export default RGBLights;

const getLights = gql`
  query {
    lights: getRGBLights {
      name
      connected
      red
      green
      blue
      mode
    }
  }
`;
