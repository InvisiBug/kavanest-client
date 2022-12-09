import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useAppContext } from "src/lib/context";

import { useRoom } from "./room";

const Deadzone = () => {
  const [deadzoneVal, setDeadzoneVal] = useState<string>("");
  const [updateDeadzone] = useMutation(mutation, {});
  const { name, getCurrentSetpoint, borders } = useRoom();

  const { data, refetch } = useQuery<GqlResponse>(request, {
    variables: {
      room: name,
    },
    fetchPolicy: "no-cache",
  });

  if (!data) return null;

  const { deadzone } = data.room;

  return (
    <Container>
      Deadzone <br />
      <MyInput
        type="text"
        placeholder={`${deadzone}°C`}
        inputMode="decimal"
        onChange={(event) => {
          setDeadzoneVal(event.target.value);
        }}
        onBlur={() => {
          updateDeadzone({
            variables: {
              input: {
                name,
                deadzone: deadzoneVal,
              },
            },
          });
          refetch();
        }}
      />
    </Container>
  );
};

export default Deadzone;

const request = gql`
  query GetSetpoints($room: String) {
    room: getRoom(name: $room) {
      deadzone
    }
  }
`;

const mutation = gql`
  mutation ($input: RoomInput) {
    updateRoom(input: $input) {
      name
      deadzone
    }
  }
`;

type GqlResponse = {
  room: {
    deadzone: number;
  };
};

const borders = false;

const Container = styled.div`
  border: ${borders ? "1px solid yellow" : "none"};
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
