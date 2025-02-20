import { FC, useState, useRef } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import {
  PageTitle,
  PageContents,
  PlugSelectorV2 as PlugSelector,
  TimerCountdown,
  HeatingRoomSelector,
  RoomHeating,
  RGBLightSelector,
} from "@/lib/ui";
import { Plug, RGBLight } from "@/lib/gqlTypes";

import styled from "@emotion/styled";
import { mq, px } from "@/lib/mediaQueries";
import { useDimensions } from "@/lib/helpers/useDimension";

const filteredData = (data: any) => {
  return data.filter((item: any) => ["deskLEDs", "tableLamp", "screenLEDs"].includes(item.name));
};

const Study: FC = () => {
  const [studyLamp, setStudyLamp] = useState<Plug | undefined>(undefined);
  const [eggChair, setEggChair] = useState<Plug | undefined>(undefined);
  const ref = useRef(null);
  const { width, height } = useDimensions(ref);

  const [openRGBLight, setOpenRGBLight] = useState("");
  const [rgbLights, setRgbLights] = useState<RGBLight[] | undefined>(undefined);

  const { data } = useQuery(getLights, {
    fetchPolicy: "no-cache",
    variables: {
      name1: "eggChair",
      name2: "studyLamp",
    },
    onCompleted() {
      setStudyLamp(data.lamp);
      setEggChair(data.eggChair);

      setRgbLights(filteredData(data.lights));
    },
  });

  return (
    <>
      <Container ref={ref} width={width}>
        <Left width={width}>
          {/* {`Container width: ${width} Container height: ${height}`} */}
          <h1>Study</h1>
          <RoomHeating showTitle={false} name={"study"} />
        </Left>

        <Right>
          <h1>Lights</h1>
          {eggChair && <PlugSelector initialData={eggChair} />}
          {studyLamp && <PlugSelector initialData={studyLamp} />}

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
        </Right>
      </Container>
    </>
  );
};

export default Study;

const Container = styled.div<{ width: number }>`
  display: flex;
  ${mq("large")} {
    flex-direction: row;
    justify-content: space-around;
  }

  flex-direction: column;
`;

const Left = styled.div<{ width: number }>`
  display: flex;
  /* padding: 1rem; */
  flex-direction: column;
  /* flex-direction: ${({ width }) => (width > 1000 ? "column" : "row")}; */
  align-items: center;
  justify-content: center;
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
    eggChair: getPlug(name: $name1) {
      name
      state
      connected
      _id
    }
    lamp: getPlug(name: $name2) {
      name
      state
      connected
      _id
    }
  }
`;
