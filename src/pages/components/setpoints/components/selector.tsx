import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { decamelize } from "src/lib/helpers";
import { FlameIcon, CurrentTemp, rightArrow, Target } from "src/lib/components";
import { useQuery, gql } from "@apollo/client";
import { useAppContext } from "src/lib/context";
import { mq, px } from "src/lib/mediaQueries";

const Setpoints: React.FC<Props> = ({ roomName, onClick = null, close = null }) => {
  const [sensor, setSensor] = useState<any>();

  const { socket } = useAppContext();

  const { data } = useQuery<QueryResponse>(query, {
    variables: { roomName },
    fetchPolicy: "no-cache",
    onCompleted() {
      setSensor(data?.sensor);

      socket.on(data?.sensor?._id || "", (payload: any) => {
        setSensor(payload);
      });
    },
  });

  useEffect(() => {
    return function cleanup() {
      socket.removeAllListeners();
    };
  }, [socket]);

  if (!data || !sensor) return <></>;

  return (
    <>
      <Container onClick={onClick}>
        <RoomName connected={sensor.connected} onClick={close}>
          {decamelize(roomName)}
        </RoomName>

        <FlameContainer>
          <FlameIcon name={roomName} borders={false} />
        </FlameContainer>

        <Vals>
          <CurrentTemp name={roomName} borders={false} />
          <Target name={roomName} borders={false} />
        </Vals>

        <Arrow src={rightArrow} />
      </Container>
    </>
  );
};

export default Setpoints;

export interface Props {
  roomName: string;
  onClick: any;
  close: any;
}

const query = gql`
  query ($roomName: String) {
    sensor: getSensor(room: $roomName) {
      connected
      _id
    }
  }
`;

type QueryResponse = {
  sensor: {
    connected: boolean;
    _id: string;
  };
};

const borders = false;

const Container = styled.div`
  border: ${borders ? "1px solid yellow" : "none"};
  width: 100%;
  color: white;
  border-bottom: 1px solid grey;
  display: flex;
  align-items: center;
  margin: auto;
  min-height: 0px;
  cursor: pointer;

  ${mq("large")} {
    /* background-color: red; */
    /* height: 200px; */
    width: 200px;
    flex-direction: column;
    border: 1px solid grey;
    border-radius: 20px;
    margin: 10px 100px 10px 100px;
    /* margin-bottom: 50px; */
    /* background-color: orange; */
    /* max-width: ${px("medium")}px; */
  }
`;

const RoomName = styled.h3`
  border: ${borders ? "1px solid green" : "none"};
  display: item;
  align-self: center;
  flex-grow: 1;
  color: ${(props: { connected: boolean }) => (props.connected ? "white" : "orangered")};

  ${mq("large")} {
    flex-grow: 0;
  }
`;

const Vals = styled.div`
  border: ${borders ? "1px solid orange" : "none"};
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  min-width: 3rem;
  margin-right: 1.5rem;
  gap: 1rem;

  ${mq("large")} {
    width: 100%;
    align-self: flex-start;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 1rem;
  }
`;

const Arrow = styled.img`
  border: ${borders ? "1px solid brown" : "none"};
  height: 20px;
  min-width: 1rem;

  ${mq("large")} {
    display: none;
  }
`;

const FlameContainer = styled.div`
  margin-right: 2rem;
  ${mq("large")} {
    margin-bottom: 1rem;
    margin-right: 0px;
  }
`;
