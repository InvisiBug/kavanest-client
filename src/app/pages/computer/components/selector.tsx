import React, { FC, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { gql, useMutation } from "@apollo/client";
import { SelectorHeader, on, off, disconnected } from "../../../lib";
import { useAppContext } from "../../../utils";
import Details from "./details";

const Selector: FC<Props> = ({ data, socketUpdate }) => {
  const { socket } = useAppContext();
  const [drawer, setOpenDrawer] = useState<boolean>(false);
  const [updateComputerAudio] = useMutation(mutation, {});

  const buttonclicked = (relay: string): any => {
    const { left, right, sub, mixer } = data;

    if (relay === "master") {
      updateComputerAudio({ variables: { input: { master: data.left && data.right && data.sub && data.mixer ? false : true } } });
    } else {
      const input: any = { left, right, sub, mixer };
      input[relay] = !input[relay];
      updateComputerAudio({ variables: { input } });
    }
  };

  const { name, _id, connected, left, right, sub, mixer } = data;
  const master = left && right && sub && mixer;

  useEffect(() => {
    if (_id) {
      socket.on(_id, (payload: any) => {
        socketUpdate(_id, payload);
      });
    }
    return function cleanup() {
      socket.off(_id);
    };
  }, []); //eslint-disable-line

  return (
    <>
      <Container>
        <SelectorHeader name={name} openDrawer={drawer} setOpenDrawer={setOpenDrawer}>
          <StateIndicator state={master} connected={connected} />
        </SelectorHeader>
        {drawer ? <Details data={data} buttonClicked={(relay: string) => buttonclicked(relay)} /> : null}
      </Container>
    </>
  );
};

export default Selector;

interface Props {
  data: {
    name: string;
    left: boolean;
    right: boolean;
    sub: boolean;
    mixer: boolean;
    connected: boolean;
    _id: string;
  };
  socketUpdate: any;
}

const mutation = gql`
  mutation ($input: ComputerAudioInput) {
    updateComputerAudio(input: $input) {
      name
    }
  }
`;

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
  margin-right: 1rem;
  background-color: ${(props: { state: boolean; connected: boolean }) => (props.connected ? (props.state ? on : off) : disconnected)};
`;
