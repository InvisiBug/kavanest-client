import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Room } from "@/lib/gqlTypes";

import { useHeating } from "../alloys/heating/heating";

const Deadzone: FC = () => {
  const [deadzoneVal, setDeadzoneVal] = useState<string>("");
  const [updateDeadzone] = useMutation(mutation, {});
  const { name, borders } = useHeating();

  const { data, refetch } = useQuery<GqlResponse>(request, {
    variables: {
      room: name,
    },
    fetchPolicy: "no-cache",
  });

  return (
    <Container borders={borders}>
      Deadzone <br />
      <MyInput
        type="text"
        borders={borders}
        placeholder={data?.room?.deadzone ? `${data?.room?.deadzone || "Not Set"}°C` : "Not Set"}
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
  query GetDeadzone($room: String) {
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
  room: Room;
};

const Container = styled.div`
  border: ${({ borders }: { borders: boolean }) => (borders ? "1px solid yellow" : "none")};
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
