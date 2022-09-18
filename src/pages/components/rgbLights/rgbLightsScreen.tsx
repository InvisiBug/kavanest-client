import React, { useState } from "react";
import { PageTitle, PageContents } from "../../../lib";
import { useQuery, gql } from "@apollo/client";
import { RGBLightSelector } from "../../../lib";
import { PlugSelector } from "../../../lib";

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
      <PageContents>
        <PlugSelector thisPlug={floodlight} socketUpdate={socketUpdate} openDetails={openRGBLight} setOpenDetails={setOpenRGBLight} />
        <PlugSelector thisPlug={sun} socketUpdate={socketUpdate} openDetails={openRGBLight} setOpenDetails={setOpenRGBLight} key={Math.random()} />
        {rgbLights.map((light: any) => {
          return (
            <RGBLightSelector
              thisLight={light}
              allRgbLights={rgbLights}
              setRgbLights={setRgbLights}
              openRGBLight={openRGBLight}
              setOpenRGBLight={setOpenRGBLight}
              key={Math.random()}
            ></RGBLightSelector>
          );
        })}
      </PageContents>
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
