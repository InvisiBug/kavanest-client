import React, { FC, useState, useEffect } from "react";
import { decamelize, getCurrentSetpointV2, weekOrWeekend } from "../../../utils";
import styled from "@emotion/styled";
import { flame } from "../../../lib";
import { useQuery, gql, useMutation } from "@apollo/client";
import SetpointList from "./setpointList";
import { useAppContext } from "../../../utils";

const RoomSetpoints: FC<Props> = ({ room, close }) => {
  const [days, setDays] = useState<string>(weekOrWeekend());
  const [deadzoneVal, setDeadzoneVal] = useState<string>("");
  const [offsetVal, setOffsetVal] = useState<string>("");

  const { socket } = useAppContext();

  // Socket updatable data
  const [sensor, setSensor] = useState<any>();
  const [valve, setValve] = useState<any>();
  const [heating, setHeating] = useState<any>();

  const { data, refetch } = useQuery(request, {
    variables: { room },
    fetchPolicy: "no-cache",
    onCompleted() {
      data.sensor.temperature = 100;
      setSensor(data.sensor);
      setValve(data.valve);
      setHeating(data.heating);

      console.log(data.heating);

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

  const [updateDeadzone] = useMutation(deadzoneMutation, {});
  const [updateOffset] = useMutation(offsetMutation, {});

  if (!data || !heating || !valve) return <></>;

  const target = data.setpoints?.setpoints || "";
  const deadzone = data.setpoints?.deadzone || 0;
  const offset = data.sensor?.offset || 0;

  console.log(getCurrentSetpointV2(target));

  return (
    <>
      <PageTitle onClick={close}>
        <TitleText>&larr; {decamelize(room)}</TitleText>
      </PageTitle>
      <Info>
        <Left>
          <CurrentTemp>
            Current <br />
            {`${sensor?.temperature}°C`}
          </CurrentTemp>

          <Setpoint>
            Target
            <br /> {getCurrentSetpointV2(target)![1] ? `${getCurrentSetpointV2(target)![1]}°C` : "Off"}
          </Setpoint>
        </Left>

        {heating.state && !valve.state ? <FlameIcon src={flame} /> : null}

        <Right>
          <Offset>
            Offset <br />
            <MyInput
              type="text"
              placeholder={`${offset}°C`}
              inputMode="decimal"
              onChange={(event) => {
                setOffsetVal(event.target.value);
              }}
              onBlur={() => {
                updateOffset({ variables: { input: { room, offset: parseFloat(offsetVal) } } });
                refetch();
              }}
            />
          </Offset>
          <Deadzone>
            Deadzone <br />
            <MyInput
              type="text"
              placeholder={`${deadzone}°C`}
              inputMode="decimal"
              onChange={(event) => {
                setDeadzoneVal(event.target.value);
              }}
              onBlur={() => {
                updateDeadzone({ variables: { input: { room, deadzone: deadzoneVal } } });
                refetch();
              }}
            />
          </Deadzone>
        </Right>
      </Info>
      <SetpointList room={room} setDays={setDays} data={data} days={days} refreshPage={() => refetch()} />
    </>
  );
};

export default RoomSetpoints;
export interface Props {
  room: string;
  close?: () => void;
}

const request = gql`
  query GetSetpoints($room: String) {
    setpoints: getSetpoint(room: $room) {
      room
      setpoints {
        weekday
        weekend
      }
      deadzone
    }
    valve: getValve(room: $room) {
      room
      state
      connected
      _id
    }
    sensor: getSensor(room: $room) {
      room
      temperature
      offset
      _id
    }
    heating: getPlug(name: "heating") {
      name
      state
      connected
      _id
    }
  }
`;

const deadzoneMutation = gql`
  mutation ($input: DeadzoneInput) {
    updateDeadzone(input: $input) {
      room
      deadzone
    }
  }
`;

const offsetMutation = gql`
  mutation UpdateOffset($input: offsetsInput) {
    updateOffset(input: $input) {
      room
    }
  }
`;

const borders: boolean = false;

const PageTitle = styled.div`
  cursor: pointer;
`;

const TitleText = styled.h1`
  border: ${borders ? "1px solid green" : "none"};
  border-bottom: 1px solid grey;
  padding-bottom: 5px; // Required
  margin-bottom: 0;
`;

const Info = styled.div`
  border: ${borders ? "1px solid purple" : "none"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid grey;
`;

const Left = styled.div`
  border: ${borders ? "1px solid white" : "none"};
  margin: 0.5rem 1.5rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Setpoint = styled.div`
  border: ${borders ? "1px solid white" : "none"};
  font-size: 1.2rem;
  text-align: center;
`;

const CurrentTemp = styled.div`
  border: ${borders ? "1px solid white" : "none"};
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const FlameIcon = styled.img`
  height: 35px;
  margin-right: 2rem;
  margin-top: -12px;
`;

const Right = styled.div`
  font-size: 1.2rem;
  margin-right: 1.5rem;
  text-align: center;
`;

const Offset = styled.div`
  border: ${borders ? "1px solid orangered" : "none"};
  margin-bottom: 1.5rem;
`;

const Deadzone = styled.div`
  border: ${borders ? "1px solid yellow" : "none"};
`;

const MyInput = styled.input`
  text-align: center;
  type: text;
  font-size: 1.2rem;
  width: 100px;
  color: red;
  background-color: rgba(255, 255, 255, 0);
  border: ${borders ? "1px solid white" : "none"};
  margin: 0;
  ::placeholder {
    color: white;
  }
`;
