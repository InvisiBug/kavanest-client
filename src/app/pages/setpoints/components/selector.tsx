import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { decamelize, getCurrentSetpointV2 } from "../../../utils";
import { rightArrow, flame } from "../../../lib";
import { useQuery, gql } from "@apollo/client";
import { useAppContext } from "../../../utils";

const Setpoints: React.FC<Props> = ({ data: { room }, onClick = null, close = null }) => {
  const [sensor, setSensor] = useState<any>();
  const [valve, setValve] = useState<any>();
  const [heating, setHeating] = useState<any>();

  const { socket } = useAppContext();

  const { data } = useQuery(query, {
    variables: { room },
    fetchPolicy: "no-cache",
    onCompleted() {
      data.sensor.temperature = 100;
      setSensor(data.sensor);
      setValve(data.valve);
      setHeating(data.heating);

      console.log(data.sensor);

      socket.on(data.sensor._id, (payload: any) => {
        setSensor(payload);
      });

      socket.on(data.valve._id, (payload: any) => {
        setValve(payload);
      });

      socket.on(data.heating._id, (payload: any) => {
        setHeating(payload);
      });
    },
  });

  useEffect(() => {
    return function cleanup() {
      socket.removeAllListeners();
    };
  }, []); // eslint-disable-line

  if (!data || !heating || !valve || !sensor) return <></>;

  let target: any;

  target = data?.setpoints?.setpoints;

  return (
    <>
      <Container onClick={onClick}>
        <RoomName connected={sensor.connected} onClick={close}>
          {decamelize(room)}
        </RoomName>
        {!valve.state && heating.state ? <FlameIcon src={flame}></FlameIcon> : null}
        <Vals>
          <Current>{`${sensor?.temperature ? sensor.temperature : "n/a"}°C`}</Current>
          <Setpoint>
            Target
            <br />
            {getCurrentSetpointV2(target) ? `${getCurrentSetpointV2(target)![1]}°C` : "Off"}
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
      connected
      _id
    }
    heating: getPlug(name: "heating") {
      state
      connected
      _id
    }
    sensor: getSensor(room: $room) {
      temperature
      connected
      _id
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
  border-bottom: 1px solid grey;
  display: flex;
  align-items: center;
  margin: auto;
  min-height: 0px;
  cursor: pointer;
`;

const RoomName = styled.h3`
  display: item;
  align-self: center;
  flex-grow: 1;
  color: ${(props: { connected: boolean }) => (props.connected ? "white" : "orangered")};
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
  text-align: center;
  margin-right: 1.5rem;
`;

const Arrow = styled.img`
  height: 20px;
`;
