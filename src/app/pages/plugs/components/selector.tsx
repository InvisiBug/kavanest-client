import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { gql, useMutation } from "@apollo/client";
import { Selector, on, off, disconnected } from "../../../lib";
import { useAppContext } from "../../../utils";

const RoomSelector: React.FC<Props> = ({ thisPlug, socketUpdate }) => {
  const { socket } = useAppContext();
  const [updatePlug] = useMutation(mutation, {});

  const { name, state, connected, _id } = thisPlug;

  useEffect(() => {
    if (_id) {
      socket.on(_id, (payload: any) => {
        socketUpdate(_id, payload);
      });
    }

    return () => {
      socket.off(_id);
    };
  }, []); // eslint-disable-line

  return (
    <>
      <Container>
        <Selector name={name} connected={connected} onClick={() => updatePlug({ variables: { input: { name: name, state: !state } } })}>
          <StateIndicator state={state} connected={connected} />
        </Selector>
      </Container>
    </>
  );
};

export default React.memo(RoomSelector);

export interface Props {
  thisPlug: PlugData;
  socketUpdate?: any;
  openDetails?: string;
  setOpenDetails?: (key: string) => void;
}

export interface PlugData {
  name: string;
  state: boolean;
  connected: boolean;
  _id: string;
}

const borders = false;

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
  /* border: ${borders ? "1px solid green" : null}; */
  color: white;
  border-bottom: 1px solid grey;

  display: flex;
  flex-direction: column;
  margin: auto;
`;

const StateIndicator = styled.div`
  border: ${borders ? "1px solid orange" : null};

  /* height: 1rem;
  width: 1rem;
  margin-right: 1.55rem; */

  height: 2rem;
  width: 2rem;
  margin-right: 2.3rem;
  /* margin-right: 1rem; */

  border-radius: 1rem;
  background-color: ${(props: { state: boolean; connected: boolean }) => (props.connected ? (props.state ? on : off) : disconnected)};
`;
