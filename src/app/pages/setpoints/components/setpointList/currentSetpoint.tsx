import React from "react";
import styled from "@emotion/styled";

import { cancel, on } from "../../../../lib";
import { makeRequest } from "../../../../utils";

const CurrentSetpoint: React.FC<Props> = ({ room, day, time, temp, close, thisOne }) => {
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
        <Time thisOne={thisOne}>{time}</Time>
        <Remove src={cancel} onClick={() => remove()} />
        <Temp thisOne={thisOne}>{temp}°C</Temp>
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
  thisOne: boolean;
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
  justify-content: space-between;
  align-items: center;
  border: ${borders ? "1px solid green" : null};
`;

const Time = styled.p`
  border: ${borders ? "1px solid orange" : null};
  font-size: 1.2rem;
  color: ${(props: { thisOne: boolean }) => (props.thisOne ? on : "white")};
`;

const Temp = styled.p`
  border: ${borders ? "1px solid white" : null};
  font-size: 1.2rem;
  color: ${(props: { thisOne: boolean }) => (props.thisOne ? on : "white")};
`;

const Remove = styled.img`
  border: ${borders ? "1px solid orange" : null};
  height: 1.5rem;
  margin: 1.5rem;
  /* margin: 0; */
`;
