import { FC } from "react";
import styled from "@emotion/styled";
import { gql, useMutation } from "@apollo/client";

const Buttons: FC<any> = ({ refetch }) => {
  const [updateTime] = useMutation(mutation, {});

  const times = [0, 10, 20, 30];

  return (
    <Container>
      <h1>Times</h1>
      <ButtonRow>
        {times.map((time) => {
          return (
            <Button
              onClick={() => {
                updateTime({ variables: { input: { value: time, name: "mattress" } } });
                refetch();
              }}
              key={Math.random()}
            >
              {time !== 0 ? time : "Off"}
            </Button>
          );
        })}
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
