import React, { useState, useEffect } from "react";
import { asyncRequest, decamelize } from "../../utils";
import styled from "@emotion/styled";
import { flame } from "../../atoms";

const Switches: React.FC<any> = ({ name, close = null }) => {
  const [data, setData] = useState<any | null | void>(null);
  const [heating, setHeating] = useState<any | null | void>(null);

  useEffect(() => {
    asyncRequest(setpointQuery, setData, {
      room: name,
    });
    asyncRequest(query, setHeating, {
      name: name,
    });
  }, []); // eslint-disable-line

  if (!data || heating === undefined) return <></>;

  const createSetpoints = () => {
    const setpointsArray: any = [];

    for (let time in data.setpoints) {
      setpointsArray.push(
        <SetpointRow key={Math.random()}>
          <Time>{time}</Time>
          <Temp>{data.setpoints[time]}°C</Temp>
        </SetpointRow>
      );
    }

    setpointsArray.push(
      <SetpointRow key={Math.random()}>
        <Add>add button here</Add>
      </SetpointRow>
    );
    return setpointsArray;
  };

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

// const query: string = `
//   query GetValve($name: String) {
//     response:getValve(name: $name) {
//       state
//       name
//     }
//   }
// `;

const query: string = `
  query GetValve($name: String) {
    response:getValve(name: $name) {
      state
      name
    }
  }
`;

const SetpointRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  ::last-of-type {
    margin-bottom: 20px;
  }
`;

const Add = styled.p`
  display: item;
  align-self: center;
`;

const Time = styled.p`
  display: item;
  align-self: center;
  margin-right: 20px;
  font-size: 1.2rem;
`;

const Temp = styled.p`
  display: item;
  align-self: center;
  margin-right: 20px;
  font-size: 1.2rem;
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
  /* border: 1px solid green; */
  border-bottom: 1px solid grey;
  padding-bottom: 5px;
  margin-bottom: 0;
`;

const Info = styled.div`
  /* border: 1px solid purple; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid grey;
`;

const Left = styled.div`
  /* border: 1px solid white; */
  height: 75px;
  /* width: 75px; */
  margin: 1.5rem 1.5rem 1.5rem;
  /* margin-bottom: 20px; */
  /* margin-left: 20px; */
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
