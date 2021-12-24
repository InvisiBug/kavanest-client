import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { decamelize, useAppContext } from "../../../utils";
import { rightArrow, downArrow, Text, Room } from "../../../lib";
import SensorDetails from "./details";

const Sensor: React.FC<Props> = ({
  thisSensor: { room, temperature, rawTemperature, humidity, offset, connected, _id },
  allSensors,
  setAllSensors,
  openSensor,
  setOpenSensor,
}) => {
  const { socket } = useAppContext();

  useEffect(() => {
    if (_id) {
      socket.on(_id, (payload: any) => {
        const updatedSensors: Array<SensorData> = [...allSensors];

        for (let key in updatedSensors) {
          if (updatedSensors[key].room === room) {
            updatedSensors[key] = payload;
          }
        }

        setAllSensors(updatedSensors);
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
            setOpenSensor(openSensor === room ? "" : room);
          }}
        >
          <Room>{decamelize(room)}</Room>
          <Temp>
            <Text>{`${temperature}°C`}</Text>
          </Temp>
          <Icon src={openSensor === room ? downArrow : rightArrow} />
        </Header>

        {openSensor === room ? (
          <div onClick={() => setOpenSensor(openSensor === room ? "" : room)}>
            <SensorDetails temperature={temperature} rawTemperature={rawTemperature} humidity={humidity} offset={offset} connected={connected} />
          </div>
        ) : null}
      </Container>
    </>
  );
};

export default Sensor;

interface Props {
  thisSensor: SensorData;
  allSensors: Array<SensorData>;
  setAllSensors: (key: Array<SensorData>) => void;
  openSensor: string;
  setOpenSensor: (key: string) => void;
}
export interface SensorData {
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
