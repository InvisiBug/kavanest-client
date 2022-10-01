import React, { useState } from "react";
import { PageTitle, PageContents, RGBLightSelector, PlugSelector } from "src/lib/components";
import { useQuery, gql } from "@apollo/client";
import { Plug, RGBLight } from "src/lib/types";

const RGBLights: React.FC = () => {
  const [openRGBLight, setOpenRGBLight] = useState<string>("");
  const [rgbLights, setRgbLights] = useState<RGBLight[] | undefined>();
  const [floodlight, setFloodlight] = useState<Plug | undefined>();
  const [sun, setSun] = useState<Plug | undefined>();

  const { data } = useQuery<GraphglResponse | undefined>(getLights, {
    fetchPolicy: "no-cache",
    variables: { name1: "floodlight", name2: "sun" },
    onCompleted() {
      console.log(data);
      setRgbLights(data?.lights);
      setFloodlight(data?.floodlight);
      setSun(data?.sun);
    },
  });

  const socketUpdate = (_id: string, payload: Plug) => {
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
        {rgbLights?.map((light: any) => {
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

type GraphglResponse = {
  lights: RGBLight[];
  floodlight: Plug;
  sun: Plug;
};
