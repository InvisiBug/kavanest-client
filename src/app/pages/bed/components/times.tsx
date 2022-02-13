import React, { FC } from "react";
import styled from "@emotion/styled";
import { gql, useMutation } from "@apollo/client";

const Buttons: FC<any> = () => {
  const [updateTime] = useMutation(mutation, {});

  return (
    <Container>
      <h1>Times</h1>
      <ButtonRow>
        <Button onClick={() => updateTime({ variables: { input: { value: 0, name: "mattress" } } })}>Off</Button>
        <Button onClick={() => updateTime({ variables: { input: { value: 20, name: "mattress" } } })}>20</Button>
        <Button onClick={() => updateTime({ variables: { input: { value: 30, name: "mattress" } } })}>30</Button>
        <Button onClick={() => updateTime({ variables: { input: { value: 40, name: "mattress" } } })}>40</Button>
      </ButtonRow>
    </Container>
  );
};

export default Buttons;

const mutation = gql`
  mutation UpdateTimer($input: TimerInput) {
    updateTimer(input: $input) {
      value
      name
    }
  }
`;

const Container = styled.div`
  padding-top: 0;
  text-align: center;
  border-bottom: 1px solid grey;
  display: flex;
  flex-direction: column;
`;

const Button = styled.div`
  padding: 1rem;
  /* height: 3rem; */
  display: grid;
  border: 1px solid grey;
  margin: 20px;
  align-items: center;
  border-radius: 20px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-around;
`;
