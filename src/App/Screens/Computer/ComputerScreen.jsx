import React from "react";
import styled from "@emotion/styled";
import { ComputerPower, ComputerAudio } from "./Components";

const Container = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 85%;
  width: 90%;
  max-width: 1500px;

  left: 50%;
  top: 50%;
`;

const Computer = () => {
  return (
    <Container>
      <ComputerPower />
      <ComputerAudio />
    </Container>
  );
};

export default Computer;
