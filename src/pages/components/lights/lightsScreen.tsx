import React, { useState } from "react";
import { PageTitle, PageContents, RGBLightSelector, PlugSelectorV2 as PlugSelector } from "src/lib/components";
import { useQuery, gql, useMutation } from "@apollo/client";
import Details from "./components/details";
import { rgbToArray } from "src/lib/helpers";

const RGBLights: React.FC<any> = () => {
  const [openRGBLight, setOpenRGBLight] = useState("");
  const [rgbLights, setRgbLights] = useState<any>(undefined);
  const [floodlight, setFloodlight] = useState<any>(undefined);
  const [lamp, setLamp] = useState<any>(undefined);
  const [sun, setSun] = useState<any>(undefined);

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

  if (!rgbLights || !lamp || !floodlight || !sun) return <></>;

  return (
    <>
      <PageTitle desc={"Some of these lights have alternative modes"}>Lights</PageTitle>
      <PageContents>
        <PlugSelector data={floodlight} />
        <PlugSelector data={lamp} />
        <PlugSelector data={sun} />

        {/* Couldnt figure out how to pass in details from here */}
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
