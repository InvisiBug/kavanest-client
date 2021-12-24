import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { decamelize, useAppContext } from "../../../utils";
import { rightArrow, downArrow, Text, Room } from "../../../lib";
import SensorDetails from "./details";

const Sensor: React.FC<Props> = ({
  sensor: { room, temperature, rawTemperature, humidity, offset, connected, _id },
  openSensor,
  setOpenSensor,
  refetch,
}) => {
  // const { openSensor, setOpenSensor, socket } = useAppContext();
  const { socket } = useAppContext();
  const [data, setData] = useState<SensorData>({ room, temperature, rawTemperature, humidity, offset, connected });

  useEffect(() => {
    if (_id) {
      socket.on(_id, (payload: any) => {
        setData(payload);
      });
    }

    return function cleanup() {
      socket.off(_id);
    };
  }, []); // eslint-disable-line

  return (
    <>
      <Container>
        <Header
          onClick={() => {
            setOpenSensor(openSensor === data.room ? "" : room);
            refetch();
          }}
        >
          <Room>{decamelize(room)}</Room>
          <Temp>
            <Text>{`${data.temperature}°C`}</Text>
          </Temp>
          <Icon src={openSensor === data.room ? downArrow : rightArrow} />
        </Header>

        {openSensor === data.room ? (
          <div onClick={() => setOpenSensor(openSensor === data.room ? "" : room)}>
            <SensorDetails
              temperature={data.temperature}
              rawTemperature={data.rawTemperature}
              humidity={data.humidity}
              offset={data.offset}
              connected={data.connected}
            />
          </div>
        ) : null}
      </Container>
    </>
  );
};

export default Sensor;

interface Props {
  sensor: SensorData;
  openSensor: string;
  setOpenSensor: (key: string) => void;
  refetch: any;
}
interface SensorData {
  room: string;
  rawTemperature: number;
  temperature: number;
  humidity: number;
  offset: number;
  connected: boolean;
  _id?: string;
}

const Container = styled.div`
  color: white;
  border-bottom: 1px solid grey;
  :first-of-type {
    border-top: 1px solid grey;
    margin-top: 50px;
  }

  display: flex;
  flex-direction: column;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin: auto;
  /* flex-grow: 1; */
  min-height: 0px;
  cursor: pointer;
`;

const Temp = styled.div`
  margin-right: 20px;
`;

const Icon = styled.img`
  height: 20px;
`;
