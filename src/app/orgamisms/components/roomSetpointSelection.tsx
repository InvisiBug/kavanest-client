import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { decamelize } from "../../utils";
import { rightArrow, flame } from "../../atoms";
import { asyncRequest } from "../../utils";

/*
  Each room that has a valve gets a setpoint modifier screen
*/
const Setpoints: React.FC<Props> = ({ data: { room }, onClick = null, close = null }) => {
  const [valve, setValve] = useState<any>(null);
  const [sensor, setSensor] = useState<any>(null);

  useEffect(() => {
    asyncRequest(query, setValve, { room: room });
    asyncRequest(sensorQuery, setSensor, { room: room });
  }, []); //eslint-disable-line

  if (!valve || !sensor) return <></>;

  return (
    <>
      <Container onClick={onClick}>
        <Room onClick={close}>{decamelize(room)}</Room>
        {valve.state ? <FlameIcon src={flame}></FlameIcon> : null}
        <Vals>
          <Setpoint heating={false}>Setpoint°C</Setpoint>
          <Temp>{sensor.temperature}°C</Temp>
        </Vals>
        <Icon src={rightArrow}></Icon>
      </Container>
    </>
  );
};

export default Setpoints;

export interface Props {
  data: any;
  onClick: any;
  close: any;
}

const query: string = `
  query($room: String) {
    response:getValve(room: $room) {
      state
      room
    }
  }
`;

const setpointQuery = `
  query($room: String) {
    response:getSetpoints(room: $room) {
      room
      setpoints
    }
  }
`;

const sensorQuery = `
  query($room: String) {
    response:getSensor(room: $room) {
      temperature
    }
  }
`;

const Setpoint = styled.div`
  color: ${(props: { heating: boolean }) => (props.heating ? `orangered` : null)};
`;

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
  /* flex-direction: column; */
  align-items: center;
  margin: auto;
  /* width: 100vw; */
  min-height: 0px;
  cursor: pointer;
`;

const Room = styled.h3`
  display: item;
  align-self: center;
  flex-grow: 1;
`;

const Vals = styled.div`
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
