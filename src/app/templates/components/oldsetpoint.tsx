import React, { useState } from "react";
import styled from "@emotion/styled";

import { decamelize } from "../../utils";
import { mq, px, rightArrow, downArrow, flame } from "../../lib/components/elements";

// TODO add media queries to scale the container

const SetpointsV3: React.FC<Props> = ({ data: { room, setpoints, heating } }) => {
  const [details, setDetails] = useState(false);

  console.log(setpoints);

  return (
    <>
      <Container>
        <Header>
          <Room>{decamelize(room)}</Room>
          <FlameIcon src={flame}></FlameIcon>

          <Temps>
            <Setpoint heating={true}>Setpoint°C</Setpoint>
            <Temp>Curent°C</Temp>
          </Temps>
          <Icon src={details ? downArrow : rightArrow}></Icon>
        </Header>
      </Container>
    </>
  );
};

export default SetpointsV3;

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

const Setpoint = styled.div`
  color: ${(props: { heating: boolean }) => (props.heating ? `orangered` : null)};
`;

type SetpointProps = {
  heating: boolean;
};

const FlameIcon = styled.img`
  /* height: 50px; */

  height: 35px;
  margin-right: 20px;
  margin-top: -10px;
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
  /* width: 100vw; */
  min-height: 0px;
`;

const Header = styled.div`
  display: flex;
  /* border: 1px solid red; */
  width: 90vw;
  align-items: center;
  margin: auto;

  min-height: 0px;
`;

const Room = styled.h3`
  display: item;
  align-self: center;
  flex-grow: 1;
`;

const Temps = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  align-items: center;
`;

const Temp = styled.div`
  margin-top: 2px;
`;

const Icon = styled.img`
  height: 20px;
`;
