import React, { useState } from "react";
import { PageTitle, PageContents, RGBLightSelector, PlugSelector } from "src/lib/components";
import { useQuery, gql } from "@apollo/client";

const RGBLights: React.FC<any> = () => {
  const [openRGBLight, setOpenRGBLight] = useState("");
  const [rgbLights, setRgbLights] = useState<any>("");
  const [floodlight, setFloodlight] = useState<any>();
  const [lamp, setLamp] = useState<any>("");
  const [sun, setSun] = useState<any>("");

  const { data } = useQuery(getLights, {
    fetchPolicy: "no-cache",
    variables: {
      name1: "floodlight",
      name2: "sun",
      name3: "lamp",
    },
    onCompleted() {
      setRgbLights(data.lights);
      setLamp(data.lamp);
      setFloodlight(data.floodlight);
      setSun(data.sun);
    },
  });

  const socketUpdate = (_id: any, payload: any) => {
    switch (payload.name) {
      case "floodlight":
        setFloodlight(payload);
        break;
      case "lamp":
        setLamp(payload);
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
        <PlugSelector thisPlug={lamp} socketUpdate={socketUpdate} openDetails={openRGBLight} setOpenDetails={setOpenRGBLight} />
        <PlugSelector thisPlug={sun} socketUpdate={socketUpdate} openDetails={openRGBLight} setOpenDetails={setOpenRGBLight} />
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
  query ($name1: String, $name2: String, $name3: String) {
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
    lamp: getPlug(name: $name3) {
      name
      state
      connected
      _id
    }
  }
`;
