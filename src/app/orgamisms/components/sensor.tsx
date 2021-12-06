import React, { useState } from "react";
import styled from "@emotion/styled";

import { decamelize } from "../../utils";
import { mq, px, rightArrow, downArrow } from "../../atoms";

// TODO add media queries to scale the container

const Sensor: React.FC<Props> = ({ sensor: { room, rawTemperature, temperature, humidity, offset, connected } }) => {
  const [details, setDetails] = useState(false);

  return (
    <>
      <Container>
        <Room>{decamelize(room)}</Room>
        <Temp>{`${temperature}°C`}</Temp>
        <Icon src={details ? downArrow : rightArrow} onClick={() => setDetails(!details)}></Icon>
      </Container>
    </>
  );
};

export default Sensor;

const Container = styled.div`
  color: white;
  /* background-color: #2c2c2c; */
  border-bottom: 1px solid grey;

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  /* margin-top: 20px; */

  width: 90vw;
  /* ${mq("small")} {
    max-width: 650px;
    min-width: 650px;
    ${px("small")}
    flex-direction: row;
  }
  ${mq("medium")} {
    min-width: 0px;
  } */
`;

const Offset = styled.p`
  display: item;
  color: purple;
  align-self: center;
`;
const Icon = styled.img`
  height: 20px;
`;

const Room = styled.h3`
  color: white;
  display: item;
  align-self: center;
  flex-grow: 1;
`;

const RawTemp = styled.p`
  display: item;
  color: orange;
  align-self: center;
`;

const Temp = styled.p`
  display: item;
  color: white;
  align-self: center;
  margin-right: 20px;
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

{
  /* <RawTemp>{`Raw Temperature: ${rawTemperature}`}</RawTemp>
        <Temp>{`Temperature: ${temperature}`}</Temp>
        <Humidity>{`Humidity: ${humidity}`}</Humidity>
        <Offset>{`Offset: ${offset}`}</Offset>
        <Connected>{`Connected: ${connected}`}</Connected> */
}
