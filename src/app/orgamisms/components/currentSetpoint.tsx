import React from "react";
import styled from "@emotion/styled";

const CurrentSetpoint: React.FC<Props> = ({ time, temp }) => {
  return (
    <>
      <Container>
        <Time>{time}</Time>
        <Temp>{temp}°C</Temp>
      </Container>
    </>
  );
};

export default CurrentSetpoint;

interface Props {
  time: string;
  temp: string;
}

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
