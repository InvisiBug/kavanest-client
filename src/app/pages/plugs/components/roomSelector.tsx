import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { gql, useMutation } from "@apollo/client";
import { downArrow, rightArrow, Room, on, off, disconnected } from "../../../lib";
import { decamelize, useAppContext } from "../../../utils";
import Details from "./details";

/*
  A selector for each plug, with details

  When the component is created a socket listner is created according to the _id of the plug.

*/
const RoomSelector: React.FC<Props> = ({ thisPlug: { name, state, connected, _id }, socketUpdate, openDetails, setOpenDetails }) => {
  const { socket } = useAppContext();
  const [updatePlug] = useMutation(mutation, {});

  /*
    Register the socket connection on component load
    and remove it on component close
  */
  useEffect(() => {
    if (_id) {
      socket.on(_id, (payload: any) => {
        socketUpdate(_id, payload);
      });
    }

    return function cleanup() {
      socket.off(_id);
    };
  }, []); // eslint-disable-line

  const click = () => {
    updatePlug({ variables: { input: { name: name, state: !state } } });
  };

  return (
    <>
      <Container>
        <Header
          onClick={() => {
            setOpenDetails(openDetails === name ? "" : name);
          }}
        >
          <Room>{decamelize(name)}</Room>
          <StateIndicator state={state} connected={connected} />
          <Icon src={openDetails === name ? downArrow : rightArrow} />
        </Header>
        {openDetails === name ? (
          <div>
            <Details name={name} state={state} connected={connected} click={click} />
          </div>
        ) : null}
      </Container>
    </>
  );
};

export default React.memo(RoomSelector);

export interface Props {
  thisPlug: PlugData;
  socketUpdate: any;
  openDetails: string;
  setOpenDetails: (key: string) => void;
}

export interface PlugData {
  name: string;
  state: boolean;
  connected: boolean;
  _id: string;
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
