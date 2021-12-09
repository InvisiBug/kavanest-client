import React, { useState } from "react";
import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/react";

import { decamelize } from "../../utils";
import { mq, px, rightArrow, downArrow } from "../../atoms";

// TODO add media queries to scale the container

const SetpointsV2: React.FC<Props> = ({ data: { room, setpoints } }) => {
  const [details, setDetails] = useState(false);
  console.log(setpoints);

  const createSetpoints = () => {
    const currentSetpoints: any = [];
    for (let time in setpoints) {
      currentSetpoints.push(
        <Details>
          <Time>{time}</Time>
          <Temp>{setpoints[time]}°C</Temp>
        </Details>
      );
    }
    currentSetpoints.push(<Add>add button here</Add>);
    return currentSetpoints;
  };

  return (
    <>
      <Container>
        <Header onClick={() => setDetails(!details)}>
          <Room>{decamelize(room)}</Room>
          <div>Weekday</div>
          <div>Weekend</div>
          <Icon src={details ? downArrow : rightArrow}></Icon>
        </Header>
        {details ? createSetpoints() : null}
      </Container>
    </>
  );
};

// ? setpoints.map((setpoint: any) => {
//   console.log(setpoint);
//   return <Details>setpoint.time</Details>;
// })
// : null}

export default SetpointsV2;
const Setpoint = styled.div`
  display: flex;
`;

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
    display:hidden;
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
  width: 90vw;
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
  width: 90vw;
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

const Time = styled.p`
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
  justify-content: space-around;
  ::last-of-type {
    margin-bottom: 20px;
  }
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

const Temp = styled.p`
  display: item;
  align-self: center;
  margin-right: 20px;
`;
const Add = styled.p`
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
  data: any;
}

export interface SensorData {
  room: string;
  rawTemperature: number;
  temperature: number;
  humidity: number;
  offset: number;
  connected: boolean;
}
