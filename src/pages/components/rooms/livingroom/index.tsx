import { FC, useState, useRef } from "react";
import styled from "@emotion/styled";
import { useQuery, gql } from "@apollo/client";
import { PlugSelectorV2 as PlugSelector, RoomHeating } from "@/lib/ui";
import { Plug } from "@/lib/gqlTypes";
import { mq } from "@/lib/mediaQueries";

const Study: FC = () => {
  const [lamp, setLamp] = useState<Plug | undefined>(undefined);
  const [floodLight, setFloodLight] = useState<Plug | undefined>(undefined);
  const ref = useRef(null);

  const { data } = useQuery<{ lamp: Plug; floodlight: Plug }>(getLights, {
    fetchPolicy: "no-cache",
    variables: {
      name1: "livingRoomLamp",
      name2: "floodlight",
    },
    onCompleted() {
      setLamp(data?.lamp);
      setFloodLight(data?.floodlight);
    },
  });

  return (
    <>
      <Container ref={ref}>
        <Left>
          <h1>Heating</h1>
          <RoomHeating showTitle={false} name={"livingRoom"} />
        </Left>

        <Right>
          <h1>Lights</h1>
          {lamp && <PlugSelector initialData={lamp} />}
          {floodLight && <PlugSelector initialData={floodLight} />}
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
  query ($name1: String, $name2: String) {
    lamp: getPlug(name: $name1) {
      name
      state
      connected
      _id
    }
    floodlight: getPlug(name: $name2) {
      name
      state
      connected
      _id
    }
  }
`;
