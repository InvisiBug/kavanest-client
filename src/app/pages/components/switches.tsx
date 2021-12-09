import React, { useState, useLayoutEffect, useEffect } from "react";
import styled from "@emotion/styled";
import { asyncRequest, decamelize } from "../../utils";

const Switches: React.FC<any> = ({ name, close = null }) => {
  const [data, setData] = useState<any | null | void>(null);

  useLayoutEffect(() => {
    asyncRequest(query, setData, {
      room: name,
    });
  }, []); // eslint-disable-line

  if (!data) return <></>;

  const createSetpoints = () => {
    const currentSetpoints: any = [];
    for (let time in data.setpoints) {
      currentSetpoints.push(
        <Details>
          <Time>{time}</Time>
          <Temp>{data.setpoints[time]}°C</Temp>
        </Details>
      );
    }
    currentSetpoints.push(
      <Details>
        <Add>add button here</Add>
      </Details>
    );
    return currentSetpoints;
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
        <FlameIcon src="https://c.tenor.com/VUH3A7tK-qgAAAAi/dm4uz3-foekoe.gif"></FlameIcon>
        <Right>Deadzone</Right>
      </Info>
      <div>{createSetpoints()}</div>
    </>
  );
};

const query: string = `
    query GetAllSetpoints($room: String) {
      response:getSetpoints(room: $room) {
        room
        setpoints
      }
    }
  `;

export default Switches;
export interface Props {}
const Details = styled.div`
  /* height: 20px; */
  /* background-color: green; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  ::last-of-type {
    margin-bottom: 20px;
  }
  /* border: 1px solid white; */
  /* animation: slide-out-top 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) forwards; */
  /* transition: all 0.5s ease; */
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
  /* color: red; */
  /* border: 1px solid red; */
`;
const FlameIcon = styled.img`
  /* height: 50px; */

  object-fit: scale-down;
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
