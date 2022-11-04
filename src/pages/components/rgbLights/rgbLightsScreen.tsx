import React, { useState } from "react";
import { PageTitle, PageContents, RGBLightSelector, PlugSelector } from "src/lib/components";
import { useQuery } from "@apollo/client";
import { graphql } from "src/gql";
import { RgbLight, Plug } from "src/gql/graphql";
// import { RgbLight } from "src/lib/types";

const RGBLights: React.FC<any> = () => {
  const [openRGBLight, setOpenRGBLight] = useState("");
  const [rgbLights, setRgbLights] = useState<(RgbLight | null)[]>();
  const [floodlight, setFloodlight] = useState<Plug>();
  const [lamp, setLamp] = useState<Plug>();
  const [sun, setSun] = useState<Plug>();

  const { data } = useQuery(getLights, {
    fetchPolicy: "no-cache",
    variables: {
      name1: "floodlight",
      name2: "sun",
      name3: "lamp",
    },
    onCompleted() {
      if (!data) return;
      const { lights, lamp, sun, floodlight } = data;

      if (lights) setRgbLights(lights);
      if (lamp) setLamp(lamp);
      if (floodlight) setFloodlight(floodlight);
      if (sun) setSun(sun);
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

  return (
    <>
      <PageTitle desc={"Some of these lights have alternative modes"}>Lights</PageTitle>

      <PageContents>
        {floodlight ? (
          <PlugSelector thisPlug={floodlight} socketUpdate={socketUpdate} openDetails={openRGBLight} setOpenDetails={setOpenRGBLight} />
        ) : null}

        {lamp ? <PlugSelector thisPlug={lamp} socketUpdate={socketUpdate} openDetails={openRGBLight} setOpenDetails={setOpenRGBLight} /> : null}

        {sun ? <PlugSelector thisPlug={sun} socketUpdate={socketUpdate} openDetails={openRGBLight} setOpenDetails={setOpenRGBLight} /> : null}

        {rgbLights
          ? rgbLights.map((light: any) => {
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
            })
          : null}
      </PageContents>
    </>
  );
};

export default RGBLights;

const getLights = graphql(/* GraphQL */ `
  query getLights($name1: String, $name2: String, $name3: String) {
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
`);
