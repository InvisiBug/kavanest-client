import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { decamelize } from "@/lib/helpers";
import { FlameIndicator, CurrentTemp, rightArrow, Target, SelectorTitle } from "@/lib/ui";
import { useQuery, gql } from "@apollo/client";
import { useAppContext } from "@/lib/context";
import { mq, px } from "@/lib/mediaQueries";
import { radiatorDisconectColour, sensorDisconectColour } from "@/lib/constants";
import Thermometer from "../../thermometer";

const HeatingRoomSelector: React.FC<Props> = ({ roomName, onClick = null }) => {
  const [sensor, setSensor] = useState<any>();
  const [radiator, setRadiator] = useState<any>();

  const { socket } = useAppContext();

  const { data } = useQuery<QueryResponse>(query, {
    variables: { roomName },
    fetchPolicy: "no-cache",
    onCompleted() {
      setSensor(data?.sensor);
      setRadiator(data?.radiator);

      socket.on(data?.sensor?._id || "", (payload: any) => {
        setSensor(payload);
      });

      socket.on(data?.radiator?._id || "", (payload: any) => {
        setRadiator(payload);
      });
    },
  });

  useEffect(() => {
    return function cleanup() {
      socket.removeAllListeners();
    };
  }, [socket]);

  if (!data) return <></>;

  return (
    <>
      <Container onClick={onClick}>
        {sensor && radiator && (
          <RoomName sensorConnected={sensor.connected} radiatorConnected={radiator.connected}>
            {decamelize(roomName)}
          </RoomName>
        )}

        <FlameContainer>
          <FlameIndicator name={roomName} borders={false} />
        </FlameContainer>

        <Vals>
          <CurrentTemp name={roomName} borders={false} />
          <Target name={roomName} borders={false} />
        </Vals>

        <Arrow src={rightArrow} />

        {/* <Thermometer temp={data.sensor.temperature} setpoint={10} /> */}
      </Container>
    </>
  );
};

export default HeatingRoomSelector;

export interface Props {
  roomName: string;
  onClick: any;
}

const query = gql`
  query ($roomName: String) {
    sensor: getSensor(room: $roomName) {
      connected
      temperature
      _id
    }
    radiator: getRadiator(name: $roomName) {
      connected
      _id
    }
  }
`;

type QueryResponse = {
  sensor: {
    connected: boolean;
    temperature: number;
    _id: string;
  };
  radiator: {
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
    /* margin: 10px 100px 10px 100px; */
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
  font-size: 1rem;
  color: ${({ sensorConnected, radiatorConnected }: { sensorConnected: boolean; radiatorConnected: boolean }) =>
    sensorConnected && radiatorConnected
      ? "white"
      : radiatorConnected
      ? sensorDisconectColour
      : !sensorConnected && !radiatorConnected
      ? "green"
      : radiatorDisconectColour};

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
  margin-right: 1rem;
  gap: 1rem;
  font-size: 1rem;

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
