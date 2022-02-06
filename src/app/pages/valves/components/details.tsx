import React from "react";
import styled from "@emotion/styled";
import { switchOn, switchOff } from "../../../lib";

const PlugDetails: React.FC<Props> = ({ name, state, connected, click }) => {
  return (
    <>
      <Container>
        <Button onClick={click} src={state ? switchOn : switchOff}></Button>
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;

const Button = styled.img`
  border: ${borders ? "1px solid yellow" : "none"};
  height: 4rem;
  width: 4rem;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;
