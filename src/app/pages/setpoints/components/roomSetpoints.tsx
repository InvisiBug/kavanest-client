import React, { FC, useState } from "react";
import { decamelize, getCurrentSetpoint, weekOrWeekend } from "../../../utils";
import styled from "@emotion/styled";
import { flame } from "../../../lib";
import { useQuery, gql, useMutation } from "@apollo/client";
import SetpointList from "./subComponents/setpointList";

const RoomSetpoints: FC<Props> = ({ room, close }) => {
  const [days, setDays] = useState<string>(weekOrWeekend());
  const [deadzoneVal, setDeadzoneVal] = useState<string>("");

  const { data, refetch } = useQuery(request, { variables: { room }, fetchPolicy: "no-cache" });
  const [updateDeadzone] = useMutation(mutation, {});

  if (!data) return <></>;

  const setpoints = data.setpoints.setpoints;
  const deadzone = data.setpoints.deadzone;

  return (
    <>
      <PageTitle onClick={close}>
        <TitleText>&larr; {decamelize(room)}</TitleText>
      </PageTitle>

      <Info>
        <Left>
          <CurrentTemp>
            Current <br />
            {`${data.sensor.temperature}°C`}
          </CurrentTemp>

          <Setpoint>
            Setpoint
            <br /> {`${getCurrentSetpoint(setpoints)}°C`}
          </Setpoint>
        </Left>

        {data.valve.state ? null : <FlameIcon src={flame} />}

        <Right>
          Deadzone <br />
          <MyInput
            type="text"
            placeholder={deadzone ? `${deadzone}°C` : "0°C"}
            inputMode="decimal"
            onChange={(event) => {
              setDeadzoneVal(event.target.value);
              console.log("cange");
            }}
            onBlur={() => {
              updateDeadzone({ variables: { input: { room, deadzone: deadzoneVal } } });
              refetch();
            }}
          />
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
      state
    }
    sensor: getSensor(room: $room) {
      temperature
    }
  }
`;

const mutation = gql`
  mutation ($input: DeadzoneInput) {
    updateDeadzone(input: $input) {
      room
      deadzone
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

const MyInput = styled.input`
  text-align: center;
  type: text;
  font-size: 1.2rem;
  width: 50px;
  color: red;
  background-color: rgba(255, 255, 255, 0);
  border: ${borders ? "1px solid white" : "none"};
  margin: 0;
  ::placeholder {
    color: white;
  }
`;
