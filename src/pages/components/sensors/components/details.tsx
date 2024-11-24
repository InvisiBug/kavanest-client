import React from "react";
import styled from "@emotion/styled";
import { Text } from "@/lib/ui";

const ShowDetails: React.FC<Props> = ({ rawTemperature, temperature, humidity, offset, connected }) => {
  return (
    <>
      <Details>
        <Text>
          Temperature <br /> {`${temperature}`}
        </Text>

        <Text>
          Raw Temperature
          <br />
          {` ${rawTemperature}`}
        </Text>

        <Text>
          Humidity
          <br />
          {` ${humidity}`}
        </Text>

        {/* Cant add onclick here due to the text function, need to re work */}
        <Offsets>
          <Text>
            Offset
            <br />
          </Text>
          <MyInput
            type="text"
            placeholder={`${offset}°C`}
            inputMode="decimal"
            onChange={(event) => {
              // setOffsetVal(event.target.value);
              console.log("cange");
            }}
            onBlur={() => {
              // updateOffset({ variables: { input: { room, offset: parseFloat(offsetVal) } } });
              // refetch();
            }}
          />
        </Offsets>

        <Text>
          Connected
          <br />
          {` ${connected}`}
        </Text>
      </Details>
    </>
  );
};

export default ShowDetails;

// TODO make this better lol

const Offsets = styled.div`
  /* background-color: red; */
  text-align: center;
`;

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

const Item = styled.div`
  /* background-color: black; */
`;

const MyInput = styled.input`
  text-align: center;
  type: text;
  font-size: 1.2rem;
  width: 100px;
  color: red;
  background-color: rgba(255, 255, 255, 0);
  /* background-color: none; */

  margin: 0;
  ::placeholder {
    color: white;
  }
`;

interface Props {
  rawTemperature: number;
  temperature: number;
  humidity: number;
  offset: number;
  connected: boolean;
}
