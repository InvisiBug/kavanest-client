import React, { useState } from "react";
import styled from "@emotion/styled";

import { decamelize } from "../../utils";
import { mq, px, rightArrow, downArrow } from "../../atoms";

// TODO add media queries to scale the container

const Sensor: React.FC<Props> = ({ sensor: { room, rawTemperature, temperature, humidity, offset, connected } }) => {
  const [details, setDetails] = useState(false);

  return (
    <>
      <Container onClick={() => setDetails(!details)}>
        <Header>
          <Room>{decamelize(room)}</Room>
          <Temp>{`${temperature}°C`}</Temp>
          <Icon src={details ? downArrow : rightArrow}></Icon>
        </Header>
        {details ? (
          <Details>
            <RawTemp>{`Raw Temperature: ${rawTemperature}`}</RawTemp>
            <Temp>{`Temperature: ${temperature}`}</Temp>
            <Humidity>{`Humidity: ${humidity}`}</Humidity>
            <Offset>{`Offset: ${offset}`}</Offset>
            <Connected>{`Connected: ${connected}`}</Connected>
          </Details>
        ) : null}
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
  flex-direction: column;
  margin: auto;
  width: 90vw;

  margin-top: 20px;

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

const Header = styled.div`
  display: flex;
  /* border: 1px solid red; */
  width: 90vw;
  align-items: center;
  margin: auto;
  flex-grow: 1;
`;

const Room = styled.h3`
  color: white;
  display: item;
  align-self: center;
  flex-grow: 1;
`;

const Temp = styled.p`
  display: item;
  color: white;
  align-self: center;
  margin-right: 20px;
`;

const Icon = styled.img`
  height: 20px;
`;

const Details = styled.div`
  /* height: 20px; */
  /* background-color: green; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Offset = styled.p`
  display: item;
  color: purple;
  align-self: center;
`;

const RawTemp = styled.p`
  display: item;
  color: orange;
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
