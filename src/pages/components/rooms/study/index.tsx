import { FC, useState, useRef } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { PlugSelectorV2 as PlugSelector, RoomHeating, RGBLightSelectorV2 as RGBLightSelector, AudioSelectorV2 as ComputerAudioSelector } from "@/lib/ui";
import { Plug, RGBLight, ComputerAudio } from "@/lib/gqlTypes";

import styled from "@emotion/styled";
import { mq, px } from "@/lib/mediaQueries";
import { useDimensions } from "@/lib/helpers/useDimension";

const filteredData = (data: any) => {
  return data.filter((item: any) => ["deskLEDs", "tableLamp", "screenLEDs"].includes(item.name));
};

const Study: FC = () => {
  const [studyLamp, setStudyLamp] = useState<Plug | undefined>(undefined);
  const [eggChair, setEggChair] = useState<Plug | undefined>(undefined);
  const [deskLEDs, setDeskLEDs] = useState<RGBLight | undefined>(undefined);
  const [screenLEDs, setScreenLEDs] = useState<RGBLight | undefined>(undefined);
  const [tableLamp, setTableLamp] = useState<RGBLight | undefined>(undefined);
  const [computerAudio, setComputerAudio] = useState<any>();

  const ref = useRef(null);
  const { width } = useDimensions(ref);

  const [openRGBLight, setOpenRGBLight] = useState("");
  const [openDetails, setOpenDetails] = useState<string>("");

  const { data } = useQuery<AllControls>(getLights, {
    fetchPolicy: "no-cache",

    onCompleted() {
      setStudyLamp(data?.lamp);
      setEggChair(data?.eggChair);
      setComputerAudio(data?.computerAudio);

      // setRgbLights(filteredData(data.lights));

      setDeskLEDs(data?.deskLEDs);
      setScreenLEDs(data?.screenLEDs);
      setTableLamp(data?.tableLamp);
    },
  });

  return (
    <>
      <Container ref={ref} width={width}>
        <Left width={width}>
          {/* {`Container width: ${width} Container height: ${height}`} */}
          <h1>Heating</h1>
          <RoomHeating showTitle={false} name={"study"} />
        </Left>

        <Right>
          <h1>Devices</h1>
          {eggChair && <PlugSelector initialData={eggChair} />}
          {studyLamp && <PlugSelector initialData={studyLamp} />}

          {deskLEDs && <RGBLightSelector initialData={deskLEDs} openRGBLight={openRGBLight} setOpenRGBLight={setOpenRGBLight} key={Math.random()} />}
          {screenLEDs && <RGBLightSelector initialData={screenLEDs} openRGBLight={openRGBLight} setOpenRGBLight={setOpenRGBLight} key={Math.random()} />}
          {tableLamp && <RGBLightSelector initialData={tableLamp} openRGBLight={openRGBLight} setOpenRGBLight={setOpenRGBLight} key={Math.random()} />}

          {computerAudio && <ComputerAudioSelector initialData={computerAudio} openDetails={openDetails} setOpenDetails={setOpenDetails} />}
        </Right>
      </Container>
    </>
  );
};

// {/* {rgbLights &&
//             rgbLights.map((light: any) => {
//               return (
//                 <RGBLightSelector
//                   thisLight={light}
//                   allRgbLights={rgbLights}
//                   setRgbLights={setRgbLights}
//                   openRGBLight={openRGBLight}
//                   setOpenRGBLight={setOpenRGBLight}
//                   key={Math.random()}
//                 />
//               );
//             })} */}

export default Study;

type AllControls = { lamp: Plug; eggChair: Plug; deskLEDs: RGBLight; screenLEDs: RGBLight; tableLamp: RGBLight; computerAudio: ComputerAudio };

const borders = false;

const Container = styled.div<{ width: number }>`
  border: ${borders ? "1px solid white" : "none"};
  display: flex;
  ${mq("large")} {
    flex-direction: row;
    justify-content: space-around;
  }

  flex-direction: column;
`;

const Left = styled.div<{ width: number }>`
  border: ${borders ? "1px solid red" : "none"};
  display: flex;
  /* padding: 1rem; */
  flex-direction: column;
  /* flex-direction: ${({ width }) => (width > 1000 ? "column" : "row")}; */
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  /* height: 100%; */
  background-color: #1f1f1f;

  ${mq("large")} {
    width: 45%;
  }
`;

const Right = styled.div`
  display: flex;
  /* padding: 1rem; */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  ${mq("large")} {
    width: 45%;
  }
  height: 100%;
  background-color: #1f1f1f;
`;

const getLights = gql`
  query {
    deskLEDs: getRGBLight(name: "deskLEDs") {
      name
      connected
      red
      green
      blue
      _id
    }
    screenLEDs: getRGBLight(name: "screenLEDs") {
      name
      connected
      red
      green
      blue
      _id
    }
    tableLamp: getRGBLight(name: "tableLamp") {
      name
      connected
      red
      green
      blue
      _id
    }

    eggChair: getPlug(name: "eggChair") {
      name
      state
      connected
      _id
    }
    lamp: getPlug(name: "studyLamp") {
      name
      state
      connected
      _id
    }
    computerAudio: getComputerAudio {
      name
      left
      right
      sub
      mixer
      connected
      _id
    }
  }
`;
