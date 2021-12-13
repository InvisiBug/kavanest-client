import React, { useState, useEffect } from "react";
import { asyncRequest, decamelize } from "../../utils";
import styled from "@emotion/styled";
import { flame, plus } from "../../atoms";
import { CurrentSetpoint, NewSetpoint } from "../../orgamisms";

const Switches: React.FC<any> = ({ room, close = null }) => {
  const [currentSetpoints, iHazSetpoint] = useState<any | null>(null);
  const [valves, iHazValve] = useState<any | null | void>(null);
  const [showNewSetpoint, setShowNewSetpoint] = useState<boolean | null | void>(false);

  useEffect(() => {
    asyncRequest(setpointsPls, iHazSetpoint, {
      room,
    });
    asyncRequest(valvesPls, iHazValve, {
      room,
    });
  }, []); // eslint-disable-line

  const refreshPage = () => {
    setShowNewSetpoint(false);
    asyncRequest(setpointsPls, iHazSetpoint, {
      room,
    });
    asyncRequest(valvesPls, iHazValve, {
      room,
    });
  };

  const createSetpoints = () => {
    const setpointsArray: any = [];

    /* If we dont have setpoints, Show the form to add a new setpoint */
    if (!currentSetpoints) {
      return (
        <SetpointRow key={Math.random()}>
          {showNewSetpoint ? <NewSetpoint close={refreshPage} room={room} /> : <Add src={plus} onClick={() => setShowNewSetpoint(true)} />}
        </SetpointRow>
      );
    }

    for (let time in currentSetpoints.setpoints) {
      setpointsArray.push(
        <SetpointRow key={Math.random()}>
          <CurrentSetpoint time={time} temp={currentSetpoints.setpoints[time]} room={room} close={refreshPage} />
        </SetpointRow>
      );
    }

    setpointsArray.push(
      <SetpointRow key={Math.random()}>
        {showNewSetpoint ? <NewSetpoint close={refreshPage} room={room} /> : <Add src={plus} onClick={() => setShowNewSetpoint(true)} />}
      </SetpointRow>
    );
    return setpointsArray;
  };

  if (!room || valves === undefined) {
    return <></>;
  }

  return (
    <>
      <PageTitle onClick={close}>
        <TitleText>&larr; {decamelize(room)}</TitleText>
      </PageTitle>
      <Info>
        <Left>
          <Top>Setpoint: 20°C</Top>
          <Bottom>Current: 19°C</Bottom>
        </Left>
        {valves && valves.state ? <FlameIcon src={flame}></FlameIcon> : null}
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

const setpointsPls: string = `
  query($room: String) {
    response:getSetpoints(room: $room) {
      setpoints
    }
  }
`;

const valvesPls: string = `
  query GetValve($room: String) {
    response:getValve(room: $room) {
      state
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
