import React, { useState } from "react";
import styled from "@emotion/styled";
import { decamelize } from "../../../utils";
import { rightArrow, downArrow, Text, Room } from "../../../lib";
import SensorDetails from "./details";

const Sensor: React.FC<Props> = ({ sensor: { room, rawTemperature, temperature, humidity, offset, connected }, openRoom, setOpenRoom }) => {
  const [details, setDetails] = useState(false);

  const showDetails = () => {
    return (
      <>
        <div onClick={() => setOpenRoom(openRoom === room ? "" : room)}>
          <SensorDetails temperature={temperature} rawTemperature={rawTemperature} humidity={humidity} offset={offset} connected={connected} />
        </div>
      </>
    );
  };

  return (
    <>
      {/* <div>helo</div> */}
      <Container>
        <Header onClick={() => setOpenRoom(openRoom === room ? "" : room)}>
          <Room>{decamelize(room)}</Room>
          <Temp>
            <Text>{`${temperature}°C`}</Text>
          </Temp>
          <Icon src={openRoom === room ? downArrow : rightArrow} />
        </Header>
        {openRoom === room ? showDetails() : null}
      </Container>
    </>
  );
};

export default Sensor;

export interface Props {
  sensor: SensorData;
  openRoom: string;
  setOpenRoom: (room: string) => void;
}

export interface SensorData {
  room: string;
  rawTemperature: number;
  temperature: number;
  humidity: number;
  offset: number;
  connected: boolean;
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
