import React, { FC } from "react";
import { Text } from "../../../lib";
import styled from "@emotion/styled";

const Details: FC<any> = ({ data }) => {
  console.log(data);
  return (
    <>
      <Container>
        <Item>
          <Text>
            Master <br /> {`${2}`}
          </Text>
        </Item>

        <Text>
          Left
          <br />
          {` ${2}`}
        </Text>

        <Text>
          Right
          <br />
          {` ${2}`}
        </Text>

        <Text>
          Sub
          <br />
          {` ${2}`}
        </Text>

        <Text>
          Mixer
          <br />
          {` ${2}`}
        </Text>
      </Container>
    </>
  );
};

export default Details;

const Container = styled.div`
  /* border: 1px solid red; */
  /* display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly; */

  display: flex;
  flex-direction: column;
  cursor: pointer;

  /* margin-bottom: 20px; */
`;

const Item = styled.div`
  /* background-color: black; */
`;

interface Props {
  rawTemperature: number;
  temperature: number;
  humidity: number;
  offset: number;
  connected: boolean;
}
