import React, { FC } from "react";
import styled from "@emotion/styled";
import { gql, useMutation } from "@apollo/client";

const Buttons: FC<any> = ({ refetch }) => {
  const [updateTime] = useMutation(mutation, {});

  return (
    <Container>
      <h1>Times</h1>
      <ButtonRow>
        <Button
          onClick={() => {
            updateTime({ variables: { input: { value: 0, name: "mattress" } } });
            refetch();
          }}
        >
          Off
        </Button>
        <Button
          onClick={() => {
            updateTime({ variables: { input: { value: 10, name: "mattress" } } });
            refetch();
          }}
        >
          10
        </Button>
        <Button
          onClick={() => {
            updateTime({ variables: { input: { value: 20, name: "mattress" } } });
            refetch();
          }}
        >
          20
        </Button>
        <Button
          onClick={() => {
            updateTime({ variables: { input: { value: 30, name: "mattress" } } });
            refetch();
          }}
        >
          30
        </Button>
        <Button
          onClick={() => {
            updateTime({ variables: { input: { value: 40, name: "mattress" } } });
            refetch();
          }}
        >
          40
        </Button>
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
  display: grid;
  border: 1px solid grey;
  margin: 20px;
  align-items: center;
  border-radius: 20px;
  :active {
    background-color: grey;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-around;
`;
