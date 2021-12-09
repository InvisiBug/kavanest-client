import React, { useState } from "react";
import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/react";

import { decamelize } from "../../utils";
import { mq, px, rightArrow, downArrow } from "../../atoms";

// TODO add media queries to scale the container

const Sensor: React.FC<Props> = ({ sensor: { room, rawTemperature, temperature, humidity, offset, connected } }) => {
  const [details, setDetails] = useState(false);

  return (
    <>
      <Container>
        <Header onClick={() => setDetails(!details)}>
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

const bounce = keyframes`
  /* from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  100% {
    transform: translate3d(0,-4px,0);
     background-color:red
  } */
  from {
    transform: translateY(-50px);
    /* height:0px; */
    /* display:hidden; */
  }
  to {
    height:auto;
    transform: rotate(360deg);
  }
`;

const fade = keyframes`
  from {
    /* z-index: -10; */
    /* background-color:red; */
    /* opacity: 0; */
    /* display: hidden; */
    transform: translateY(-100%);
    height:0px;
    /* opacity:0; */
    /* transform:  rotate(0deg) scaleX(0) scaleY(0) ; */
    /* height:0px; */
  }
  50%{
    height:50px;
  }
  to {
    /* z-index: 0; */
    /* opacity: 1; */
    /* visibility: visible; */
    transform: translateY(0);
    /* transform:  rotate(0deg) scaleX(1) scaleY(1) ; */
  }
`;

const Container = styled.div`
  color: white;
  /* background-color: #2c2c2c; */
  /* border: 1px solid green; */
  border-bottom: 1px solid grey;
  :first-of-type {
    border-top: 1px solid grey;
    margin-top: 50px;
  }

  display: flex;
  flex-direction: column;
  margin: auto;

  min-height: 0px;

  /* margin-top: 20px; */

  /* animation: ${bounce} 1s; */

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
  width: 100%;
  align-items: center;
  margin: auto;
  flex-grow: 1;
  min-height: 0px;
`;

const Room = styled.h3`
  display: item;
  align-self: center;
  flex-grow: 1;
`;

const Temp = styled.p`
  display: item;
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
  margin-bottom: 20px;
  /* border: 1px solid white; */
  /* animation: ${bounce} 1s; */
  /* animation: ${fade} 2s; */
  /* animation: slide-out-top 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) forwards; */
  /* transition: all 0.5s ease; */
`;

const Offset = styled.p`
  display: item;
  align-self: center;
`;

const RawTemp = styled.p`
  display: item;
  align-self: center;
`;

const Humidity = styled.p`
  display: item;
  align-self: center;
`;

const Connected = styled.p`
  display: item;
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
