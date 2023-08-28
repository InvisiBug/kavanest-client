import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useHeating } from "../alloys/heating/heating";
import { Sensor } from "src/lib/gqlTypes";
import { textColour } from "src/lib/constants";

const Offset: FC = () => {
  const [offsetVal, setOffsetVal] = useState<string>("");
  const [updateOffset] = useMutation(mutation, {});
  const { name, borders } = useHeating();

  const { data } = useQuery<GqlResponse>(request, {
    variables: {
      room: name,
    },
    fetchPolicy: "no-cache",
  });

  if (!data) return null;

  const { offset } = data.sensor;
  console.log(offset);

  return (
    <Container borders={borders}>
      Offset <br />
      <MyInput
        type="text"
        borders={borders}
        placeholder={offset ? `${offset}°C` : "Not Set"}
        inputMode="decimal"
        onChange={(event) => setOffsetVal(event.target.value)}
        onBlur={() =>
          updateOffset({
            variables: {
              input: {
                room: name,
                offset: parseFloat(offsetVal),
              },
            },
          })
        }
      />
    </Container>
  );
};

export default Offset;

const request = gql`
  query GetOffset($room: String) {
    sensor: getSensor(room: $room) {
      offset
    }
  }
`;

const mutation = gql`
  mutation UpdateOffset($input: offsetsInput) {
    updateOffset(input: $input) {
      room
    }
  }
`;

type GqlResponse = {
  sensor: Sensor;
};

const Container = styled.div`
  color: ${textColour};
  text-align: center;
  border: ${({ borders }: { borders: boolean }) => (borders ? "1px solid orangered" : "none")};
`;

const MyInput = styled.input`
  text-align: center;
  font-size: 1.2rem;
  width: 100px;
  color: red;
  background-color: rgba(255, 255, 255, 0);
  border: ${({ borders }: { borders: boolean }) => (borders ? "1px solid white" : "none")};
  margin: 0;
  ::placeholder {
    color: white;
  }
`;
