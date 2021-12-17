import React, { useState } from "react";
import { decamelize } from "../../../utils";
import styled from "@emotion/styled";
import { flame, plus } from "../../../lib";
import CurrentSetpoint from "./currentSetpoint";
import NewSetpoint from "./newSetpoint";
import { useQuery, gql } from "@apollo/client";

const RoomSetpoints: React.FC<any> = ({ room, close = null }) => {
  const [showNewSetpoint, setShowNewSetpoint] = useState<boolean>(false);
  console.log(room);
  const { loading, error, data, refetch } = useQuery(request, {
    variables: {
      room,
    },
    fetchPolicy: "no-cache",
  });

  // if (loading) return <p>Loading</p>;
  // if (error) return <p>Error</p>;

  if (loading) return <></>;
  if (error) return <></>;

  const refreshPage = () => {
    setShowNewSetpoint(false);
    refetch();
  };

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
        {data.valve.state ? <FlameIcon src={flame}></FlameIcon> : null}
        <Right>Deadzone</Right>
      </Info>

      {Object.keys(data.setpoints.setpoints).map((time: any) => {
        const temp = data.setpoints.setpoints[time];
        return (
          <SetpointRow key={Math.random()}>
            <CurrentSetpoint time={time} temp={temp} room={room} close={refreshPage} />
          </SetpointRow>
        );
      })}

      <SetpointRow key={Math.random()}>
        {showNewSetpoint ? <NewSetpoint close={refreshPage} room={room} /> : <Add src={plus} onClick={() => setShowNewSetpoint(true)} />}
      </SetpointRow>
    </>
  );
};

export default RoomSetpoints;
export interface Props {
  name: string;
  close?: () => void;
}

const request = gql`
  query GetSetpoints($room: String) {
    setpoints: getSetpoint(room: $room) {
      setpoints
    }
    valve: getValve(room: $room) {
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
