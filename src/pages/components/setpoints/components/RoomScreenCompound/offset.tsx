import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useAppContext } from "src/lib/context";

import { useRoom } from "./room";

const Offset = () => {
  const [offsetVal, setOffsetVal] = useState<string>("");
  const [updateOffset] = useMutation(mutation, {});
  const { socket } = useAppContext();
  const { name, getCurrentSetpoint, borders } = useRoom();

  const { data } = useQuery<GqlResponse>(request, {
    variables: {
      room: name,
    },
    fetchPolicy: "no-cache",
  });

  if (!data) return null;

  const { offset } = data.sensor;

  return (
    <Container>
      Offset <br />
      <MyInput
        type="text"
        placeholder={`${offset}°C`}
        inputMode="decimal"
        onChange={(event) => {
          setOffsetVal(event.target.value);
        }}
        onBlur={() => {
          updateOffset({ variables: { input: { room: name, offset: parseFloat(offsetVal) } } });
          // refetch();
        }}
      />
    </Container>
  );
};

export default Offset;

const request = gql`
  query GetSetpoints($room: String) {
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
  sensor: {
    offset: number;
  };
};
const borders = false;
const Container = styled.div`
  border: ${borders ? "1px solid orangered" : "none"};
  margin-bottom: 1.5rem;
`;
const MyInput = styled.input`
  text-align: center;
  font-size: 1.2rem;
  width: 100px;
  color: red;
  background-color: rgba(255, 255, 255, 0);
  border: ${borders ? "1px solid white" : "none"};
  margin: 0;
  ::placeholder {
    color: white;
  }
`;
