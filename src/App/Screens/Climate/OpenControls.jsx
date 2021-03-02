/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import Button from "../../Ui Library/Button";

const OpenControls = ({ showControlsModal }) => {
  return (
    <Container>
      <Button isActive={false} handleClick={showControlsModal}>
        Controls
      </Button>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 22%;
  left: 71%;
`;
export default OpenControls;
