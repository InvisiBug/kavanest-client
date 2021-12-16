import React from "react";
import styled from "@emotion/styled";
import { Text } from "../../../lib/components/elements";

const ShowDetails: React.FC<Props> = ({ rawTemperature, temperature, humidity, offset, connected }) => {
  return (
    <>
      <Details>
        <Text>{`Temperature: ${temperature}`}</Text>
        <Text>{`Raw Temperature: ${rawTemperature}`}</Text>
        <Text>{`Humidity: ${humidity}`}</Text>
        <Text>{`Offset: ${offset}`}</Text>
        <Text>{`Connected: ${connected}`}</Text>
      </Details>
    </>
  );
};

export default ShowDetails;

// TODO make this better lol

const Details = styled.div`
  /* border: 1px solid red; */
  /* display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly; */

  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(2, 1fr);
  cursor: pointer;

  /* margin-bottom: 20px; */
`;

interface Props {
  rawTemperature: number;
  temperature: number;
  humidity: number;
  offset: number;
  connected: boolean;
}
