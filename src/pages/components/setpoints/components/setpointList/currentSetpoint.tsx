import React from "react";
import styled from "@emotion/styled";
import { cancel, on } from "src/lib/components";
import { makeRequest } from "src/lib/api";

const CurrentSetpoint: React.FC<Props> = ({ room, day, time, temp, close, activeSetpoint }) => {
  const remove = () => {
    makeRequest(shoo, {
      input: {
        time,
        name: room,
        day,
      },
    }).then(() => {
      close();
    });
  };

  return (
    <>
      <Container>
        <Time activeSetpoint={activeSetpoint}>{time}</Time>
        <Remove src={cancel} onClick={() => remove()} />
        <Temp activeSetpoint={activeSetpoint}>{temp}°C</Temp>
      </Container>
    </>
  );
};

export default CurrentSetpoint;

interface Props {
  room: string;
  time: string;
  day: string;
  temp: string;
  close: () => void;
  activeSetpoint: boolean;
}

const shoo = `
  mutation DeleteSetpoint($input: DeleteSetpointInput) {
    response: deleteSetpoint(input: $input) {
      name
    }
  }
`;

const borders: boolean = false;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: ${borders ? "1px solid green" : null};
`;

const Time = styled.div`
  border: ${borders ? "1px solid orange" : null};
  font-size: 1.2rem;
  color: ${(props: { activeSetpoint: boolean }) => (props.activeSetpoint ? on : "white")};
  min-width: 3rem;
  text-align: center;
`;

const Temp = styled.div`
  border: ${borders ? "1px solid white" : null};
  font-size: 1.2rem;
  color: ${(props: { activeSetpoint: boolean }) => (props.activeSetpoint ? on : "white")};
  min-width: 3rem;
  text-align: center;
`;

const Remove = styled.img`
  border: ${borders ? "1px solid orange" : null};
  height: 1.5rem;
  margin: auto 1.5rem;
`;
