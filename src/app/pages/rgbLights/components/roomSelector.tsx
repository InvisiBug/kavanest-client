import React, { useState } from "react";
import styled from "@emotion/styled";
import { downArrow, rightArrow, Room } from "../../../lib";
import { decamelize } from "../../../utils";
import Details from "./details";

const RoomSelector: React.FC<Props> = ({ lightData: { name, connected, red, green, blue, mode } }) => {
  const [details, setDetails] = useState<boolean>(false);

  return (
    <>
      <Container>
        <Header onClick={() => setDetails(!details)}>
          <Room>{decamelize(name)}</Room>
          <ColourIndicator red={red} green={green} blue={blue} />
          <Icon src={details ? downArrow : rightArrow} />
        </Header>
        {details ? <Details red={red} green={green} blue={blue} /> : null}
      </Container>
    </>
  );
};

export default RoomSelector;

export interface Props {
  lightData: {
    name: string;
    connected: boolean;
    red: number;
    green: number;
    blue: number;
    mode?: number;
  };
}

const Container = styled.div`
  color: white;
  border-bottom: 1px solid grey;
  :first-of-type {
    border-top: 1px solid grey;
    margin-top: 50px;
  }

  display: flex;
  flex-direction: column;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin: auto;
  justify-content: space-around;
  min-height: 0px;
  cursor: pointer;
`;

const Icon = styled.img`
  height: 20px;
`;

const ColourIndicator = styled.div`
  height: 2rem;
  width: 2rem;
  border-radius: 1rem;
  margin-right: 1rem;
  background-color: ${(props: { red: number; green: number; blue: number }) => `rgba(${props.red},${props.green},${props.blue})`};
`;
