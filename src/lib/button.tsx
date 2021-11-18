import React from "react";
import styled from "@emotion/styled";

const Button: React.FC<Props> = ({ handleClick, children }) => {
  return (
    <>
      <MyButton onClick={handleClick}>
        <Text>{children}</Text>
      </MyButton>
    </>
  );
};

export default Button;

const MyButton = styled.div`
  height: 50px;
  width: 200px;
  margin: 20px;

  background-color: rgb(31, 41, 55);
  color: white;
  border-radius: 10px;

  cursor: pointer;
  display: grid;
  place-items: center;
`;

const Text = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  user-select: none;
`;

export interface Props {
  handleClick: any;
}
