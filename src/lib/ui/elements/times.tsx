//* Displays a series of buttons used for setting the new time of a timer
//? Args
//* Update Timer - function that returns the value of the button pressed
//* Times - the values of the buttons
//! The 0.01 is used to supress an error when sending 0 as a new time which mutates to a null value
import { FC } from "react";
import styled from "@emotion/styled";

const Times: FC<Props> = ({ updateTimer, times = [0.01, 10, 15, 30], children }) => {
  return (
    <Container>
      {children && <h2>{children}</h2>}
      <ButtonRow>
        {times.map((time) => {
          return (
            <Button
              onClick={() => {
                updateTimer(time === 0.05 ? 9999999999 : time);
              }}
              key={Math.random()}
            >
              {time === 0.01 ? "Off" : time === 0.05 ? "♾️" : time}
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
  children: React.ReactNode;
};

const borders = false;

const Container = styled.div`
  border: ${borders ? "1px solid purple" : "none"};
  padding-top: 0;
  text-align: center;

  display: flex;
  flex-direction: column;
  /* max-width: 100%; */
`;

const Button = styled.div`
  padding: 1rem;
  display: grid;
  border: 1px solid grey;
  margin: 0.5rem;
  align-items: center;
  border-radius: 20px;
  :active {
    background-color: grey;
  }
  cursor: pointer;
`;

const ButtonRow = styled.div`
  border: ${borders ? "1px solid green" : "none"};

  display: flex;
  justify-content: space-between;

  flex-basis: auto;
  /* max-width: 100%; */
`;
