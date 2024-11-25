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
  // children: string | ReactNode;
  children: any;
}

const NormalText = styled.p`
  /* color: red; */
  font-size: 1rem;
  text-align: center;
`;
