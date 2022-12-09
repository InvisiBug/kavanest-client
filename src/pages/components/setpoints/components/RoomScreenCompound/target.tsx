import React, { FC } from "react";
import styled from "@emotion/styled";
import { useQuery, gql } from "@apollo/client";

import { useRoom } from "./room";

const Target: FC = () => {
  const { name, getCurrentSetpoint, borders } = useRoom();

  const { data } = useQuery<GqlResponse>(request, {
    variables: {
      room: name,
    },
    fetchPolicy: "no-cache",
  });

  if (!data) return null;

  const { setpoints } = data.room;

  return (
    <Container borders={borders}>
      Target
      <br /> {getCurrentSetpoint(setpoints)![1] > 5 ? `${getCurrentSetpoint(setpoints)![1]}°C` : "Off"}
    </Container>
  );
};

export default Target;

const request = gql`
  query GetSetpoints($room: String) {
    room: getRoom(name: $room) {
      setpoints {
        weekend
        weekday
      }
    }
  }
`;

type GqlResponse = {
  room: {
    setpoints: {
      weekday: Record<string, string>;
      weekend: Record<string, string>;
    };
  };
};

const Container = styled.div`
  border: ${({ borders }: { borders: boolean }) => (borders ? "1px solid white" : "none")};
  font-size: 1.2rem;
  text-align: center;
`;
