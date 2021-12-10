import React, { useState } from "react";
import styled from "@emotion/styled";
import { decamelize } from "../../utils";
import { rightArrow, downArrow, Room, Text } from "../../atoms";
import { SensorDetails } from "../../molecules";

const Sensor: React.FC<Props> = ({ sensor: { room, rawTemperature, temperature, humidity, offset, connected } }) => {
  const [details, setDetails] = useState(false);

  const showDetails = () => {
    return (
      <>
        <SensorDetails
          temperature={temperature}
          rawTemperature={rawTemperature}
          humidity={humidity}
          offset={offset}
          connected={connected}
        ></SensorDetails>
      </>
    );
  };

  return (
    <>
      <Container>
        <Header onClick={() => setDetails(!details)}>
          <Room>{decamelize(room)}</Room>
          <Temp>
            <Text>{`${temperature}°C`}</Text>
          </Temp>
          <Icon src={details ? downArrow : rightArrow}></Icon>
        </Header>
        {details ? showDetails() : null}
      </Container>
    </>
  );
};

export default Sensor;

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
  flex-grow: 1;
  min-height: 0px;
`;

const Temp = styled.div`
  margin-right: 20px;
`;

const Icon = styled.img`
  height: 20px;
`;

export interface Props {
  sensor: SensorData;
}

export interface SensorData {
  room: string;
  rawTemperature: number;
  temperature: number;
  humidity: number;
  offset: number;
  connected: boolean;
}