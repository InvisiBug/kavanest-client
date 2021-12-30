import React from "react";
import styled from "@emotion/styled";
import { decamelize, getCurrentSetpoint } from "../../../utils";
import { rightArrow, flame } from "../../../lib";
import { useQuery, gql } from "@apollo/client";

const Setpoints: React.FC<Props> = ({ data: { room }, onClick = null, close = null }) => {
  const { loading, error, data } = useQuery(query, { variables: { room }, fetchPolicy: "no-cache" });

  if (loading) return <></>;
  if (error) return <></>;

  const setpoints = data.setpoints.setpoints;
  // const setpoints = 2;

  return (
    <>
      <Container onClick={onClick}>
        <RoomName onClick={close}>{decamelize(room)}</RoomName>
        {!data.valve.state && data.heating.state ? <FlameIcon src={flame}></FlameIcon> : null}
        <Vals>
          <Current>
            Current
            <br />
            {`${data.sensor.temperature}°C`}
          </Current>
          <Setpoint heating={false}>
            Target
            <br />
            {`${getCurrentSetpoint(setpoints)}°C`}
          </Setpoint>
        </Vals>
        <Arrow src={rightArrow}></Arrow>
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

const query = gql`
  query ($room: String) {
    valve: getValve(room: $room) {
      state
    }
    heating: getPlug(name: "heating") {
      state
    }
    sensor: getSensor(room: $room) {
      temperature
    }
    setpoints: getSetpoint(room: $room) {
      setpoints {
        weekend
        weekday
      }
    }
  }
`;

const Container = styled.div`
  color: white;
  /* background-color: #2c2c2c; */
  /* border: 1px solid green; */
  border-bottom: 1px solid grey;
  /* :first-of-type {
    border-top: 1px solid grey;
    background-color: red;
    margin-top: 50px;
  } */

  display: flex;
  /* flex-direction: column; */
  align-items: center;
  margin: auto;
  /* width: 100vw; */
  min-height: 0px;
  cursor: pointer;
`;

const RoomName = styled.h3`
  display: item;
  align-self: center;
  flex-grow: 1;
`;

const FlameIcon = styled.img`
  height: 35px;
  margin-right: 1.5rem;
  margin-top: -10px;
`;

const Vals = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Current = styled.div`
  margin-top: 2px;
  text-align: center;
  margin-right: 1.5rem;
`;

const Setpoint = styled.div`
  color: ${(props: { heating: boolean }) => (props.heating ? `orangered` : null)};
  text-align: center;
  margin-right: 1.5rem;
`;

const Arrow = styled.img`
  height: 20px;
`;
