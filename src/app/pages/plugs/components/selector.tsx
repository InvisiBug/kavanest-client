import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { gql, useMutation } from "@apollo/client";
import { SelectorHeader, on, off, disconnected } from "../../../lib";
import { useAppContext } from "../../../utils";
import Details from "./details";

const RoomSelector: React.FC<Props> = ({ thisPlug, socketUpdate, openDetails, setOpenDetails }) => {
  const { socket } = useAppContext();
  const [updatePlug] = useMutation(mutation, {});

  const { name, state, connected, _id } = thisPlug;

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

  return (
    <>
      <Container>
        <SelectorHeader
          name={name}
          connected={connected}
          openDrawer={openDetails}
          setOpenDrawer={() => updatePlug({ variables: { input: { name: name, state: !state } } })}
        >
          <StateIndicator state={state} connected={connected} />
        </SelectorHeader>
        {openDetails === name ? (
          <div>
            <Details
              name={name}
              state={state}
              connected={connected}
              click={() => {
                updatePlug({ variables: { input: { name: name, state: !state } } });
              }}
            />
          </div>
        ) : null}
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
  height: 1rem;
  width: 1rem;
  border-radius: 1rem;
  margin-right: 1.55rem;
  background-color: ${(props: { state: boolean; connected: boolean }) => (props.connected ? (props.state ? on : off) : disconnected)};
`;
