import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { gql, useMutation } from "@apollo/client";
import { downArrow, rightArrow, Room, on, off, disconnected } from "../../../lib";
import { decamelize, useAppContext } from "../../../utils";
import Details from "./details";

const RoomSelector: React.FC<Props> = ({ plug: { name, state, connected, _id = "2" } }) => {
  const [data, setData] = useState<any | null>({ state, connected });
  const { openPlug, setOpenPlug } = useAppContext();

  useEffect(() => {
    // make connection to socket something here
  }, []); // eslint-disable-line

  const click = () => {
    updatePlug({ variables: { input: { name: name, state: !data.state } } });
  };

  const [updatePlug] = useMutation(mutation, {});

  return (
    <>
      <Container>
        <Header onClick={() => setOpenPlug(openPlug === name ? "" : name)}>
          <Room>{decamelize(name)}</Room>
          <StateIndicator state={data.state} connected={data.connected} />
          <Icon src={openPlug === name ? downArrow : rightArrow} />
        </Header>
        {openPlug === name ? (
          <div>
            <Details name={name} state={data.state} connected={data.connected} click={click} />
          </div>
        ) : null}
      </Container>
    </>
  );
};

export default RoomSelector;

export interface Props {
  plug: { name: string; connected: boolean; state: boolean; _id: string };
}

const mutation = gql`
  mutation ($input: PlugInput) {
    updatePlug(input: $input) {
      name
      state
      connected
    }
  }
`;

const Container = styled.div`
  color: white;
  border-bottom: 1px solid grey;
  :first-of-type {
    border-top: 1px solid grey;
    margin-top: 50px;
  }

  display: flex;
  flex-direction: column;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin: auto;
  justify-content: space-around;
  min-height: 0px;
  cursor: pointer;
`;

const Icon = styled.img`
  height: 20px;
`;

const StateIndicator = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 1rem;
  margin-right: 1rem;
  background-color: ${(props: { state: boolean; connected: boolean }) => (props.connected ? (props.state ? on : off) : disconnected)};
`;
