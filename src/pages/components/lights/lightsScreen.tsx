import React, { useState } from "react";
import { PageTitle, PageContents, RGBLightSelector, PlugSelectorV2 as PlugSelector } from "src/lib/components";
import { useQuery, gql, useMutation } from "@apollo/client";
import Details from "../../../lib/components/alloys/selectors/rgbLightDetails";
import { rgbToArray } from "src/lib/helpers";
import styled from "@emotion/styled";
import { mq, px } from "src/lib/mediaQueries";

const RGBLights: React.FC<any> = () => {
  const [openRGBLight, setOpenRGBLight] = useState("");
  const [rgbLights, setRgbLights] = useState<any>(undefined);
  const [floodlight, setFloodlight] = useState<any>(undefined);
  const [lamp, setLamp] = useState<any>(undefined);
  const [sun, setSun] = useState<any>(undefined);
  const [eggChair, setEggChair] = useState<any>(undefined);

  const { data } = useQuery(getLights, {
    fetchPolicy: "no-cache",
    variables: {
      name1: "floodlight",
      name2: "eggChair",
      name3: "sun",
      name4: "lamp",
    },
    onCompleted() {
      setRgbLights(data.lights);
      setLamp(data.lamp);
      setFloodlight(data.floodlight);
      setSun(data.sun);
      setEggChair(data.eggChair);
    },
  });

  if (!rgbLights || !lamp || !eggChair || !floodlight || !sun) return <></>;

  return (
    <>
      <PageTitle desc={"Some of these lights have alternative modes"}>Lights</PageTitle>
      <PageContents>
        {/* <SelectorContainer> */}
        <PlugSelector data={floodlight} />
        <PlugSelector data={eggChair} />
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
            />
          );
        })}
        {/* </SelectorContainer> */}
      </PageContents>
    </>
  );
};

export default RGBLights;
const SelectorContainer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  & > *:first-of-type {
    border-top: 1px solid grey;
  }

  ${mq("large")} {
    /* border: 1px solid white; */
    display: grid;
    /* grid-template-columns: 1fr 1fr 1fr; */
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 20px;
    /* flex-direction: row;
    flex-wrap: wrap;

    justify-content: space-around; */
    /* background-color: orange; */
    /* max-width: ${px("large")}px; */
    & > *:first-of-type {
      /* border-top: none; */
    }
    & > div {
      // Apply to child divs
      /* flex: 25%; */
      /* padding: 10%; */
      /* margin-bottom: 200px; */
    }
  }
`;

const getLights = gql`
  query ($name1: String, $name2: String, $name3: String, $name4: String) {
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
    eggChair: getPlug(name: $name2) {
      name
      state
      connected
      _id
    }
    sun: getPlug(name: $name3) {
      name
      state
      connected
      _id
    }
    lamp: getPlug(name: $name4) {
      name
      state
      connected
      _id
    }
  }
`;
