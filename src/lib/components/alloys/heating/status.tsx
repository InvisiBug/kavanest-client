import React, { FC } from "react";
import styled from "@emotion/styled";
import { useHeating } from "./heating";
import CurrentTemp from "../../elements/currentTemp";
import Offset from "../../elements/offset";
import Deadzone from "../../elements/deadzone";
import Target from "../../elements/heatingTarget";
import FlameIcon from "../../elements/flameIcon";

const Status: FC = () => {
  const { borders, name } = useHeating();

  return (
    <Container borders={borders}>
      <Left borders={borders}>
        <CurrentTemp name={name} borders={borders} />
        <Target name={name} borders={borders} />
      </Left>
      <FlameIcon name={name} borders={borders} />
      <Right>
        {/* <Offset /> */}
        <Deadzone />
      </Right>
    </Container>
  );
};

export default Status;

const Container = styled.div`
  border: ${({ borders }: { borders: boolean }) => (borders ? "1px solid purple" : "none")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid grey;
`;

const Left = styled.div`
  border: ${({ borders }: { borders: boolean }) => (borders ? "1px solid white" : "none")};
  margin: 0.5rem 1.5rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const Right = styled.div`
  font-size: 1.2rem;
  margin-right: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;
