import React from "react";
import styled from "@emotion/styled";
import { Text, on, off, disconnected, switchOn, switchOff } from "../../../lib";

const PlugDetails: React.FC<Props> = ({ name, state, connected, click }) => {
  return (
    <>
      <Details>
        <Text>{`State: ${state}`}</Text>
        <Text>{`Connected: ${connected}`}</Text>
        <Button onClick={click} state={state} connected={connected} src={state ? switchOn : switchOff}></Button>
      </Details>
    </>
  );
};

export default PlugDetails;

interface Props {
  name: string;
  state: boolean;
  connected: boolean;
  click: () => void;
}

const Details = styled.div`
  /* border: 1px solid red; */
  /* display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly; */

  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(2, 1fr);

  /* margin-bottom: 20px; */
`;

const Button = styled.img`
  height: 4rem;
  width: 4rem;
  /* border-radius: 25px; */
  /* background-color: ${(props: { state: boolean; connected: boolean }) => (props.connected ? (props.state ? on : off) : disconnected)}; */
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;
