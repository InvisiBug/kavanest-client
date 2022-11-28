//* Displays a series of buttons used for setting the new time of a timer
//? Args
//* Update Timer - function that returns the value of the button pressed
//* Times - the values of the buttons
//! The 0.01 is used to supress an error when sending 0 as a new time which mutates to a null value
import { FC } from "react";
import styled from "@emotion/styled";

const Times: FC<Props> = ({ updateTimer, times = [0.01, 10, 15, 30] }) => {
  return (
    <Container>
      <ButtonRow>
        {times.map((time) => {
          return (
            <Button
              onClick={() => {
                updateTimer(time);
              }}
              key={Math.random()}
            >
              {time === 0.01 ? "Off" : time}
            </Button>
          );
        })}
      </ButtonRow>
    </Container>
  );
};

export default Times;

type Props = {
  updateTimer: (time: number) => void;
  times?: number[];
};

const Container = styled.div`
  padding-top: 0;
  text-align: center;
  /* border-bottom: 1px solid grey; */
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
  cursor: pointer;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-around;
`;
