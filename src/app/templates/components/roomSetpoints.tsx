import React, { useState, useEffect } from "react";
import { asyncRequest, decamelize } from "../../utils";
import styled from "@emotion/styled";
import { flame, plus } from "../../atoms";
import { CurrentSetpoint, NewSetpoint } from "../../orgamisms";

const Switches: React.FC<any> = ({ name, close = null }) => {
  const [data, setData] = useState<any | null>(null);
  const [heating, setHeating] = useState<any | null | void>(null);
  const [newSetpoint, setnewSetpoint] = useState<boolean | null | void>(false);

  useEffect(() => {
    asyncRequest(setpointQuery, setData, {
      room: name,
    });
    asyncRequest(query, setHeating, {
      room: name,
    });
  }, []); // eslint-disable-line

  const newSetpointClosed = () => {
    setnewSetpoint(false);
    asyncRequest(setpointQuery, setData, {
      room: name,
    });
    asyncRequest(query, setHeating, {
      room: name,
    });
  };

  const createSetpoints = () => {
    const setpointsArray: any = [];

    for (let time in data.setpoints) {
      setpointsArray.push(
        <SetpointRow key={Math.random()}>
          <CurrentSetpoint time={time} temp={data.setpoints[time]} />
        </SetpointRow>
      );
    }

    setpointsArray.push(
      <SetpointRow key={Math.random()}>
        <SetpointRow key={Math.random()}>
          {newSetpoint ? <NewSetpoint close={newSetpointClosed} room={data.room} /> : <Add src={plus} onClick={() => setnewSetpoint(true)} />}
        </SetpointRow>
      </SetpointRow>
    );
    return setpointsArray;
  };

  if (!data || heating === undefined) return <></>;

  return (
    <>
      <PageTitle onClick={close}>
        <TitleText>&larr; {decamelize(data.room)}</TitleText>
      </PageTitle>
      <Info>
        <Left>
          <Top>Setpoint: 20°C</Top>
          <Bottom>Current: 19°C</Bottom>
        </Left>
        {heating && heating.state ? <FlameIcon src={flame}></FlameIcon> : null}
        <Right>Deadzone</Right>
      </Info>
      {createSetpoints()}
    </>
  );
};

export default Switches;
export interface Props {
  name: string;
  close?: () => void;
}

const setpointQuery: string = `
  query($room: String) {
    response:getSetpoints(room: $room) {
      room
      setpoints
    }
  }
`;

const query: string = `
  query GetValve($room: String) {
    response:getValve(room: $room) {
      state
      room
    }
  }
`;

const borders: boolean = false;

const SetpointRow = styled.div`
  border: ${borders ? "1px solid white" : "none"};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  ::last-of-type {
    margin-bottom: 20px;
  }
`;

const Add = styled.img`
  border: ${borders ? "1px solid green" : "none"};
  height: 1.8rem;
`;

const PageTitle = styled.div`
  cursor: pointer;
`;

const FlameIcon = styled.img`
  height: 35px;
  margin-right: 2rem;
  margin-top: -12px;
`;

const TitleText = styled.h1`
  border: ${borders ? "1px solid green" : "none"};
  border-bottom: 1px solid grey;
  padding-bottom: 5px;
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
  height: 75px;
  margin: 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Right = styled.div`
  font-size: 1.2rem;
  margin-right: 1.5rem;
`;

const Top = styled.div`
  font-size: 1.2rem;
`;

const Bottom = styled.div`
  font-size: 1.2rem;
`;
