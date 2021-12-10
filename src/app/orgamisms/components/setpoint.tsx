import React, { useState, useLayoutEffect } from "react";
import styled from "@emotion/styled";
import { decamelize } from "../../utils";
import { rightArrow, flame } from "../../atoms";
import { asyncRequest, makeRequest } from "../../utils";

const Setpoints: React.FC<Props> = ({ data: { room, setpoints }, onClick = null, close = null }) => {
  const [details, setDetails] = useState<any | null | void>(null);

  useLayoutEffect(() => {
    if (room) {
      asyncRequest(query, setDetails, { name: room });
    }
  }, []);

  if (!details) return <></>;

  return (
    <>
      <Container onClick={onClick}>
        <Header>
          {/* {details ? <p>{JSON.stringify(details.state)}</p> : console.log("no")} */}
          <Room onClick={close}>{decamelize(room)}</Room>
          {details.state ? <FlameIcon src={flame}></FlameIcon> : null}
          <Temps>
            <Setpoint heating={false}>Setpoint°C</Setpoint>
            <Temp>Curent°C</Temp>
          </Temps>
          <Icon src={rightArrow}></Icon>
        </Header>
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

const query: string = `
  query GetValve($name: String) {
    response:getValve(name: $name) {
      state
      name
    }
  }
`;

const Setpoint = styled.div`
  color: ${(props: { heating: boolean }) => (props.heating ? `orangered` : null)};
`;

type SetpointProps = {
  heating: boolean;
};

const FlameIcon = styled.img`
  /* height: 50px; */

  height: 35px;
  margin-right: 20px;
  margin-top: -10px;
`;

const Container = styled.div`
  color: white;
  /* background-color: #2c2c2c; */
  /* border: 1px solid green; */
  border-bottom: 1px solid grey;
  :first-of-type {
    border-top: 1px solid grey;
    margin-top: 50px;
  }

  display: flex;
  flex-direction: column;
  margin: auto;
  /* width: 100vw; */
  min-height: 0px;
  cursor: pointer;
`;

const Header = styled.div`
  display: flex;

  /* width: 90vw; */
  width: 100%;
  align-items: center;
  margin: auto;

  min-height: 0px;
`;

const Room = styled.h3`
  display: item;
  align-self: center;
  flex-grow: 1;
`;

const Temps = styled.div`
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
