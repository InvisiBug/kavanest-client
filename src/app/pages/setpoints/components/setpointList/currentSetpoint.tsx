import React from "react";
import styled from "@emotion/styled";
import { cancel } from "../../../../lib";
import { makeRequest } from "../../../../utils";

const CurrentSetpoint: React.FC<Props> = ({ room, day, time, temp, close }) => {
  const remove = () => {
    makeRequest(shoo, {
      input: {
        time,
        room,
        day,
      },
    }).then(() => {
      close();
    });
  };
  return (
    <>
      <Container>
        <Time>{time}</Time>
        <Remove src={cancel} onClick={() => remove()} />
        <Temp>{temp}°C</Temp>
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
}

const shoo = `
mutation DeleteSetpoint($input: SetpointInput) {
  response:deleteSetpoint(input: $input) {
    room
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
  /* margin-right: 200px; */
  /* margin: 0; */
`;

const Temp = styled.p`
  border: ${borders ? "1px solid white" : null};
  font-size: 1.2rem;
  /* margin: 0; */
`;

const Remove = styled.img`
  border: ${borders ? "1px solid orange" : null};
  height: 1.5rem;
  margin: 1.5rem;
  /* margin: 0; */
`;
