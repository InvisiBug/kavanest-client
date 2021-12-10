import React from "react";
import styled from "@emotion/styled";
import { Text } from "../../atoms";

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

const Details = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 20px;
`;

interface Props {
  rawTemperature: number;
  temperature: number;
  humidity: number;
  offset: number;
  connected: boolean;
}
