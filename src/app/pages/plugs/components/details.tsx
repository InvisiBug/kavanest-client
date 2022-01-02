import React from "react";
import styled from "@emotion/styled";
import { Text, on, off, disconnected, switchOn, switchOff } from "../../../lib";

const PlugDetails: React.FC<Props> = ({ name, state, connected, click }) => {
  const buttonClick = () => {
    console.log("clicked");
    click();
  };

  return (
    <>
      <Container>
        <Button onClick={buttonClick} state={state} connected={connected} src={state ? switchOn : switchOff}></Button>
      </Container>
    </>
  );
};

export default PlugDetails;

const borders: boolean = false;

interface Props {
  name: string;
  state: boolean;
  connected: boolean;
  click: () => void;
}

const Container = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;

  /* display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(2, 1fr); */

  /* margin-bottom: 20px; */
`;

const Button = styled.img`
  border: ${borders ? "1px solid yellow" : "none"};
  height: 4rem;
  width: 4rem;
  /* border-radius: 25px; */
  /* background-color: ${(props: { state: boolean; connected: boolean }) => (props.connected ? (props.state ? on : off) : disconnected)}; */
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;
