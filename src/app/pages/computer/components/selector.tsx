import React, { FC, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { gql, useMutation } from "@apollo/client";
import { downArrow, rightArrow, Room } from "../../../lib";
import { decamelize, useAppContext } from "../../../utils";
import Details from "./details";

const Selector: FC<Props> = ({ data, socketUpdate }) => {
  const { socket } = useAppContext();
  const [details, setDetails] = useState<boolean>(false);
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

  const { name, _id, connected } = data;

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
        <Header onClick={() => setDetails(!details)}>
          <Room connected={connected}>{decamelize(name)}</Room>
          <Icon src={details ? downArrow : rightArrow} />
        </Header>
        {details ? <Details data={data} buttonClicked={(relay: string) => buttonclicked(relay)} /> : null}
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
