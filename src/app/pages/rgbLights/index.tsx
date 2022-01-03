import React, { useState } from "react";
import { PageTitle, SelectorContainer } from "../../lib";
import { useQuery, gql } from "@apollo/client";
import RoomSelector from "./components/roomSelector";

const RGBLights: React.FC<any> = () => {
  const [openRGBLight, setOpenRGBLight] = useState("");
  const [rgbLights, setRgbLights] = useState<any>("");

  const { data } = useQuery(getLights, {
    fetchPolicy: "no-cache",
    onCompleted() {
      setRgbLights(data.lights);
    },
  });

  if (!rgbLights) return <></>;

  return (
    <>
      <PageTitle desc={"Some of these lights have alternative modes"}>RGB Lights</PageTitle>
      <SelectorContainer>
        {rgbLights.map((light: any) => {
          return (
            <RoomSelector
              thisLight={light}
              allRgbLights={rgbLights}
              setRgbLights={setRgbLights}
              openRGBLight={openRGBLight}
              setOpenRGBLight={setOpenRGBLight}
              key={Math.random()}
            />
          );
        })}
      </SelectorContainer>
    </>
  );
};

export default RGBLights;

const getLights = gql`
  query {
    lights: getRGBLights {
      name
      red
      green
      blue
      mode
      connected
      _id
    }
  }
`;
