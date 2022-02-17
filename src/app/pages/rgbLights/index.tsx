import React, { useState } from "react";
import { PageTitle, SelectorContainer } from "../../lib";
import { useQuery, gql } from "@apollo/client";
import RoomSelector from "./components/roomSelector";
import PlugSelector from "../plugs/components/selector";

const RGBLights: React.FC<any> = () => {
  const [openRGBLight, setOpenRGBLight] = useState("");
  const [rgbLights, setRgbLights] = useState<any>("");
  const [floodlight, setFloodlight] = useState<any>();
  const [sun, setSun] = useState<any>();

  const { data } = useQuery(getLights, {
    fetchPolicy: "no-cache",
    variables: { name1: "floodlight", name2: "sun" },
    onCompleted() {
      setRgbLights(data.lights);
      setFloodlight(data.floodlight);
      setSun(data.sun);
    },
  });

  const socketUpdate = (_id: any, payload: any) => {
    switch (payload.name) {
      case "floodlight":
        setFloodlight(payload);
        break;
      case "sun":
        setSun(payload);
        break;
    }
  };

  if (!rgbLights || !floodlight || !sun) return <></>;

  return (
    <>
      <PageTitle desc={"Some of these lights have alternative modes"}>Lights</PageTitle>
      <SelectorContainer>
        <PlugSelector
          thisPlug={floodlight}
          socketUpdate={socketUpdate}
          openDetails={openRGBLight}
          setOpenDetails={setOpenRGBLight}
          key={Math.random()}
        />
        <PlugSelector thisPlug={sun} socketUpdate={socketUpdate} openDetails={openRGBLight} setOpenDetails={setOpenRGBLight} key={Math.random()} />
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
  query ($name1: String, $name2: String) {
    lights: getRGBLights {
      name
      red
      green
      blue
      mode
      connected
      _id
    }
    floodlight: getPlug(name: $name1) {
      name
      state
      connected
      _id
    }
    sun: getPlug(name: $name2) {
      name
      state
      connected
      _id
    }
  }
`;
