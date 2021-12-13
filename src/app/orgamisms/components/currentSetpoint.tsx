import React from "react";
import styled from "@emotion/styled";
import { cancel } from "../../atoms";
import { makeRequest } from "../../utils";

const CurrentSetpoint: React.FC<Props> = ({ room, time, temp, close }) => {
  const remove = () => {
    makeRequest(shoo, {
      input: {
        time,
        room,
      },
    }).then((response) => {
      console.log(response.response.setpoints);
      close();
    });
  };
  return (
    <>
      <Container>
        <Time>{time}</Time>
        <Remove src={cancel} onClick={() => remove()}></Remove>
        <Temp>{temp}°C</Temp>
      </Container>
    </>
  );
};

export default CurrentSetpoint;

interface Props {
  room: string;
  time: string;
  temp: string;
  close: () => void;
}

const shoo = `
mutation DeleteSetpoint($input: SetpointInput) {
  response:deleteSetpoint(input: $input) {
    room
    setpoints
  }
}
`;

const borders: boolean = false;

const Container = styled.div`
  display: flex;
  width: 50vw;
  justify-content: space-between;
  border: ${borders ? "1px solid red" : null};
`;

const Time = styled.p`
  border: ${borders ? "1px solid orange" : null};
  font-size: 1.2rem;
  margin: 0;
`;

const Temp = styled.p`
  border: ${borders ? "1px solid white" : null};
  font-size: 1.2rem;
  margin: 0;
`;

const Remove = styled.img`
  border: ${borders ? "1px solid orange" : null};
  height: 1.5rem;
  margin: 0;
`;
