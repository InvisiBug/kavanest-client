import { FC, useState, useRef } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import {
  PageTitle,
  PageContents,
  PlugSelectorV2 as PlugSelector,
  TimerCountdown,
  HeatingRoomSelector,
  RoomHeating,
  RGBLightSelectorV2 as RGBLightSelector,
} from "@/lib/ui";
import { Plug, RGBLight } from "@/lib/gqlTypes";

import styled from "@emotion/styled";
import { mq, px } from "@/lib/mediaQueries";

const Study: FC = () => {
  const [lamp, setLamp] = useState<Plug | undefined>(undefined);
  const [floodLight, setFloodLight] = useState<Plug | undefined>(undefined);
  const [kitchenStrip, setKitchenStrip] = useState<RGBLight | undefined>(undefined);

  const [openRGBLight, setOpenRGBLight] = useState("");

  const ref = useRef(null);

  const { data } = useQuery(getLights, {
    fetchPolicy: "no-cache",
    onCompleted() {
      setLamp(data.lamp);
      setFloodLight(data.floodlight);

      setKitchenStrip(data.kitchenStrip);
      console.log("🚀 ~ onCompleted ~ data.kitchenStrip:", data.kitchenStrip);
    },
  });

  return (
    <>
      <Container ref={ref}>
        <Left>
          <h1>Kitchen</h1>
          <RoomHeating showTitle={false} name={"trainingRoom"} />
        </Left>

        <Right>
          <h1>Lights</h1>
          {lamp && <PlugSelector initialData={lamp} />}
          {floodLight && <PlugSelector initialData={floodLight} />}
          {kitchenStrip && (
            <RGBLightSelector initialData={kitchenStrip} openRGBLight={openRGBLight} setOpenRGBLight={setOpenRGBLight} key={Math.random()} />
          )}
        </Right>
      </Container>
    </>
  );
};

export default Study;

const Container = styled.div`
  display: flex;
  ${mq("large")} {
    flex-direction: row;
    /* max-width: 25%; */
    /* width: 75%; */
  }
  flex-direction: column;
  justify-content: space-around;
`;

const Left = styled.div`
  display: flex;

  flex-direction: column;
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
    lamp: getPlug(name: "kitchenLamp") {
      name
      state
      connected
      _id
    }
    floodlight: getPlug(name: "trainingRoomLamp") {
      name
      state
      connected
      _id
    }
    kitchenStrip: getRGBLight(name: "kitchenStrip") {
      name
      connected
      red
      green
      blue
      _id
      state
    }
  }
`;
