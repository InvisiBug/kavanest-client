import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { gql, useMutation } from "@apollo/client";
import { SelectorHeader, on, off, disconnected } from "../../../lib";
import { useAppContext } from "../../../utils";
import Details from "./details";

const RoomSelector: React.FC<any> = ({ thisValve, socketUpdate, openDetails, setOpenDetails }) => {
  const { socket } = useAppContext();

  const [valve, setValve] = useState(thisValve);
  const { room, state, connected, _id } = thisValve;

  /*
    Register the socket connection on component load
    and remove it on component close
  */
  useEffect(() => {
    if (_id) {
      socket.on(_id, (payload: any) => {
        setValve(payload);
      });
    }

    return function cleanup() {
      socket.off(_id);
    };
  }, []); // eslint-disable-line

  return (
    <>
      <Container>
        <SelectorHeader name={room} connected={valve.connected} openDrawer={false}>
          <StateIndicator state={valve.state} connected={valve.connected} />
        </SelectorHeader>
      </Container>
    </>
  );
};

export default React.memo(RoomSelector);

export interface Props {
  socketUpdate: any;
  openDetails: string;
  setOpenDetails: (key: string) => void;
}

const Container = styled.div`
  color: white;
  border-bottom: 1px solid grey;

  display: flex;
  flex-direction: column;
  margin: auto;
`;

const StateIndicator = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 1rem;
  margin-right: 1.55rem;
  background-color: ${(props: { state: boolean; connected: boolean }) => (props.connected ? (props.state ? on : off) : disconnected)};
`;