import { useState } from "react";
import { PageTitle, PageContents, RGBLightSelector, PlugSelectorV2 as PlugSelector } from "@/lib/ui";
import { useQuery, gql, useMutation } from "@apollo/client";
import Details from "@/lib/ui/alloys/selectors/rgbLightDetails";
import { rgbToArray } from "@/lib/helpers";
import styled from "@emotion/styled";
import { mq, px } from "@/lib/mediaQueries";
import { Plug, RGBLight } from "@/lib/gqlTypes";

const RGBLights: React.FC<any> = () => {
  const [openRGBLight, setOpenRGBLight] = useState("");
  const [rgbLights, setRgbLights] = useState<RGBLight[] | undefined>(undefined);
  const [floodlight, setFloodlight] = useState<Plug | undefined>(undefined);
  const [studyLamp, setStudyLamp] = useState<Plug | undefined>(undefined);
  const [bedRoomLamp, setBedRoomLamp] = useState<Plug | undefined>(undefined);
  const [eggChair, setEggChair] = useState<Plug | undefined>(undefined);
  const [livingRoomLamp, setlivingRoomLamp] = useState<Plug | undefined>(undefined);
  const [trainingRoomLamp, settrainingRoomLamp] = useState<Plug | undefined>(undefined);

  const { data } = useQuery(getLights, {
    fetchPolicy: "no-cache",
    variables: {
      name1: "floodlight",
      name2: "eggChair",
      name3: "bedRoomLamp",
      name4: "studyLamp",
      name5: "livingRoomLamp",
      name6: "trainingRoomLamp",
    },
    onCompleted() {
      setRgbLights(data.lights);
      setStudyLamp(data.lamp);
      setFloodlight(data.floodlight);
      setBedRoomLamp(data.sun);
      setEggChair(data.eggChair);
      setlivingRoomLamp(data.livingRoomLamp);
      settrainingRoomLamp(data.trainingRoomLamp);
    },
  });

  return (
    <>
      <PageTitle desc={"Some of these lights have alternative modes"}>Lights</PageTitle>
      <PageContents>
        {/* <SelectorContainer> */}
        {floodlight && <PlugSelector data={floodlight} />}
        {livingRoomLamp && <PlugSelector data={livingRoomLamp} />}
        {trainingRoomLamp && <PlugSelector data={trainingRoomLamp} />}
        {eggChair && <PlugSelector data={eggChair} />}
        {studyLamp && <PlugSelector data={studyLamp} />}
        {bedRoomLamp && <PlugSelector data={bedRoomLamp} />}

        {/* Couldnt figure out how to pass in details from here */}
        {rgbLights &&
          rgbLights.map((light: any) => {
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
  query ($name1: String, $name2: String, $name3: String, $name4: String, $name5: String, $name6: String) {
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
    livingRoomLamp: getPlug(name: $name5) {
      name
      state
      connected
      _id
    }
    trainingRoomLamp: getPlug(name: $name6) {
      name
      state
      connected
      _id
    }
  }
`;
