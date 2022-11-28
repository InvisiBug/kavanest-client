import React, { FC, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { gql, useMutation } from "@apollo/client";
import { Selector, on, off, disconnected, BooleanStateIndicator } from "src/lib/components";
import { useAppContext } from "src/lib/context";
import Details from "./details";

const AudioSelector: FC<Props> = ({ data, socketUpdate, openDrawer, setOpenDrawer }) => {
  const { socket } = useAppContext();

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
        <Selector name={name} openDetails={openDrawer} onClick={setOpenDrawer}>
          <BooleanStateIndicator state={master} connected={connected} size={"large"} />
        </Selector>
        {openDrawer === name ? <Details data={data} buttonClicked={(relay: string) => buttonclicked(relay)} /> : null}
      </Container>
    </>
  );
};

export default AudioSelector;

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
  openDrawer: string;
  setOpenDrawer: (key: string) => void;
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
