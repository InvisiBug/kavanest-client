import React from "react";
import styled from "@emotion/styled";
import { decamelize } from "../utils";
import { mq, px } from "../lib/mediaQueries";

// TODO add media queries to scale the container

const Sensor: React.FC<Props> = ({ sensor: { room, rawTemperature, temperature, humidity, offset, connected } }) => {
  return (
    <>
      <Container>
        <Room>{decamelize(room)}</Room>
        <RawTemp>{`Raw Temperature: ${rawTemperature}`}</RawTemp>
        <Temp>{`Temperature: ${temperature}`}</Temp>
        <Humidity>{`Humidity: ${humidity}`}</Humidity>
        <Offset>{`Offset: ${offset}`}</Offset>
        <Connected>{`Connected: ${connected}`}</Connected>
      </Container>
    </>
  );
};

export default Sensor;

const Container = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  background-color: #2c2c2c;

  display: flex;
  justify-content: space-around;
  margin: auto;
  margin-top: 20px;

  ${mq("small")} {
    background-color: red;
    max-width: ${px("small")}px;
  }
  ${mq("medium")} {
    background-color: orange;
    max-width: ${px("medium")}px;
  }
  ${mq("large")} {
    background-color: orange;
    max-width: ${px("large")}px;
  }

  /* @media (min-width: MEDIA_SM) {
    background-color: red;
    max-width: 640px;
  }

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 1024px) {
    max-width: 1024px;
  }

  @media (min-width: 1280px) {
    max-width: 1280px;
  }

  @media (min-width: 1536px) {
    max-width: 1536px;
  } */
`;

const Offset = styled.p`
  display: item;
  color: purple;
  align-self: center;
`;

const Room = styled.h1`
  color: white;
  display: item;
  align-self: center;
`;

const RawTemp = styled.p`
  display: item;
  color: orange;
  align-self: center;
`;

const Temp = styled.p`
  display: item;
  color: green;
  align-self: center;
`;

const Humidity = styled.p`
  display: item;
  color: blue;
  align-self: center;
`;

const Connected = styled.p`
  display: item;
  color: gold;
  align-self: center;
`;

export interface Props {
  sensor: SensorProps;
}

interface SensorProps {
  room: string;
  rawTemperature: number;
  temperature: number;
  humidity: number;
  offset: number;
  connected: boolean;
}
