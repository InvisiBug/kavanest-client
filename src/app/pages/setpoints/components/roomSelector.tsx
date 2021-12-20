import React from "react";
import styled from "@emotion/styled";
import { decamelize } from "../../../utils";
import { rightArrow, flame } from "../../../lib";
import { useQuery, gql } from "@apollo/client";

const Setpoints: React.FC<Props> = ({ data: { room }, onClick = null, close = null }) => {
  const { loading, error, data } = useQuery(getValves, { variables: { room }, fetchPolicy: "no-cache" });

  // if (loading) return <p>Loading</p>;
  // if (error) return <p>Error</p>;

  if (loading) return <></>;
  if (error) return <></>;

  data.heating.state = "test";
  console.log(data.heating.state);

  return (
    <>
      <Container onClick={onClick}>
        <Room onClick={close}>{decamelize(room)}</Room>
        {!data.valve.state && data.heating.state ? <FlameIcon src={flame}></FlameIcon> : null}
        <Vals>
          <Setpoint heating={false}>Setpoint°C</Setpoint>
          <Temp>{data.sensor.temperature}°C</Temp>
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

const getValves = gql`
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
  }
`;

const Setpoint = styled.div`
  color: ${(props: { heating: boolean }) => (props.heating ? `orangered` : null)};
`;

const FlameIcon = styled.img`
  height: 35px;
  margin-right: 20px;
  margin-top: -10px;
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
