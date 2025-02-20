import React from "react";
import styled from "@emotion/styled";
import { cancel, on } from "@/lib/ui";
import { makeRequest, Setpoint } from "@/lib/api";

const CurrentSetpoint: React.FC<Props> = ({ room, day, setpoint, close, activeSetpoint }) => {
  const remove = () => {
    makeRequest(deleteSetpointMutation, {
      input: {
        time: setpoint.time,
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
        <Time activeSetpoint={activeSetpoint}>{setpoint.time}</Time>

        <Temp activeSetpoint={activeSetpoint}>{setpoint.temp > 2 ? `${setpoint.temp}°C` : "Off"}</Temp>
        <Type>{setpoint.type}</Type>
        <Remove src={cancel} onClick={() => remove()} />
      </Container>
    </>
  );
};

export default CurrentSetpoint;

interface Props {
  room: string;
  day: string;
  setpoint: Setpoint;
  close: () => void;
  activeSetpoint: boolean;
}

const deleteSetpointMutation = `
  mutation DeleteSetpoint($input: DeleteSetpointInput) {
    response: deleteSetpoint(input: $input) {
      name
    }
  }
`;

const borders = false;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: ${borders ? "1px solid green" : null};
  width: 75%;
`;

const Time = styled.div<ActiveSetpoint>`
  border: ${borders ? "1px solid orange" : null};
  font-size: 1.2rem;
  color: ${({ activeSetpoint }) => (activeSetpoint ? on : "white")};
  min-width: 3rem;
  text-align: center;
`;

const Temp = styled.div<ActiveSetpoint>`
  border: ${borders ? "1px solid white" : null};
  font-size: 1.2rem;
  color: ${({ activeSetpoint }) => (activeSetpoint ? on : "white")};
  min-width: 3rem;
  text-align: center;
`;

const Type = styled.div`
  border: ${borders ? "1px solid pink" : null};
  border: 1px solid white;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 0 10px 0 10px;
  font-size: 0.8rem;
  border-radius: 10%;
`;

const Remove = styled.img`
  border: ${borders ? "1px solid cyan" : null};
  height: 1.5rem;
  margin: auto 1.5rem;
  cursor: pointer;
`;

type ActiveSetpoint = {
  activeSetpoint: boolean;
};
