import React, { FC, ReactNode } from "react";
import styled from "@emotion/styled";

const SelectorContainer: FC<Props> = ({ children }) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};

export default SelectorContainer;

interface Props {
  children: ReactNode;
}

const Container = styled.div`
  & > *:first-of-type {
    border-top: 1px solid grey;
    margin-top: 50px;
  }
`;
