import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { decamelize, getCurrentSetpointV2 } from "../../../../utils";
import { rightArrow, flame } from "../../../../lib";
import { useQuery, gql } from "@apollo/client";
import { useAppContext } from "../../../../utils";

const Setpoints: React.FC<Props> = ({ data: { room }, onClick = null, close = null }) => {
  const [sensor, setSensor] = useState<any>();
  const [valve, setValve] = useState<any>();
  const [heating, setHeating] = useState<any>();

  const { socket } = useAppContext();

  const { data } = useQuery(query, {
    variables: { room },
    fetchPolicy: "no-cache",
    onCompleted() {
      setSensor(data.sensor);
      setValve(data.valve);
      setHeating(data.heating);

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
          <Setpoint val={getCurrentSetpointV2(target)[1]}>
            {getCurrentSetpointV2(target)[1] > 5 ? `${getCurrentSetpointV2(target)[1]}°C` : "Off"}
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
    setpoints: getRoom(name: $room) {
      setpoints {
        weekend
        weekday
      }
    }
  }
`;

const borders = false;

const Container = styled.div`
  border: ${borders ? "1px solid yellow" : "none"};
  color: white;
  border-bottom: 1px solid grey;
  display: flex;
  align-items: center;
  margin: auto;
  min-height: 0px;
  cursor: pointer;
`;

const RoomName = styled.h3`
  border: ${borders ? "1px solid green" : "none"};
  display: item;
  align-self: center;
  flex-grow: 1;
  color: ${(props: { connected: boolean }) => (props.connected ? "white" : "orangered")};
`;

const FlameIcon = styled.img`
  border: ${borders ? "1px solid blue" : "none"};
  height: 35px;
  margin-right: 1.5rem;
  margin-top: -10px;
`;

const Vals = styled.div`
  border: ${borders ? "1px solid orange" : "none"};
  display: flex;
  align-items: center;
  min-width: 3rem;
  margin-right: 1.5rem;
`;

const Current = styled.div`
  border: ${borders ? "1px solid red" : "none"};
  margin-top: 2px;
  text-align: center;
  margin-right: 1.5rem;
  min-width: 3rem;
`;

const Setpoint = styled.div`
  border: ${borders ? "1px solid purple" : "none"};
  text-align: center;
  /* margin-right: 1.5rem; */
  min-width: 3.5rem;
  color: ${(props: { val: number }) => (props.val > -1 ? "white" : "grey")};
`;

const Arrow = styled.img`
  border: ${borders ? "1px solid brown" : "none"};
  height: 20px;
  min-width: 1rem;
`;
