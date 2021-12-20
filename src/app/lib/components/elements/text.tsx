import React from "react";
import styled from "@emotion/styled";

const Text: React.FC<Props> = ({ children }) => {
  return (
    <>
      <NormalText>{children}</NormalText>
    </>
  );
};

export default Text;

interface Props {
  children: string;
}

const NormalText = styled.p`
  font-size: 1rem;
`;
