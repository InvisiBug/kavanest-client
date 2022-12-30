import React, { FC } from "react";
import styled from "@emotion/styled";

const OverrideType: FC<any> = ({ currentType, types, updateType }) => {
  const typeToHuman = (type: string) => {
    const arr = type.split("-");

    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    return arr.join(" ");
  };

  return (
    <>
      <Container>
        {types.map((type: string, index: number) => {
          return type === currentType ? (
            <CurrentOverride key={index} onClick={() => updateType(type)}>
              {typeToHuman(type)}
            </CurrentOverride>
          ) : (
            <Override key={index} onClick={() => updateType(type)}>
              {typeToHuman(type)}
            </Override>
          );
        })}
      </Container>
    </>
  );
};

export default OverrideType;

const borders = false;

const Container = styled.div`
  border: ${borders ? "1px solid purple" : "none"};
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
`;

const Override = styled.div`
  border: 1px solid grey;
  padding: 0.5rem;
  border-radius: 25%;
  -webkit-tap-highlight-color: transparent;
  :active {
    background-color: grey;
  }
  cursor: pointer;
`;

const CurrentOverride = styled.div`
  border: 1px solid grey;
  background-color: grey;
  padding: 0.5rem;
  border-radius: 25%;
  cursor: pointer;
`;
