import React, { FC } from "react";
import styled from "@emotion/styled";
import { useQuery, gql, useMutation } from "@apollo/client";
import CurrentTemp from "./currentTemp";
import Offset from "./offset";
import Deadzone from "./deadzone";
import Target from "./target";
// import Target from "./target";
import { useRoom } from "./room";

const Status: FC = () => {
  return (
    <Container>
      <Left>
        <CurrentTemp />
        <Target />
      </Left>

      <div>flame icon</div>

      <Right>
        <Offset />
        <Deadzone />
      </Right>
    </Container>
  );
};

export default Status;

const borders = true;

const Container = styled.div`
  border: ${borders ? "1px solid purple" : "none"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid grey;
`;

const Left = styled.div`
  border: ${borders ? "1px solid white" : "none"};
  margin: 0.5rem 1.5rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Right = styled.div`
  font-size: 1.2rem;
  margin-right: 1.5rem;
  text-align: center;
`;
