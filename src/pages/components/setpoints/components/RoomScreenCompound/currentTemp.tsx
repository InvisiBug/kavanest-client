import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useAppContext } from "src/lib/context";
import { useRoom } from "./room";

const CurrentTemp = () => {
  const { socket } = useAppContext();
  const { name, borders } = useRoom();
  const [sensor, setSensor] = useState<Sensor>({} as Sensor);

  const { data } = useQuery<GqlResponse>(request, {
    variables: {
      room: name,
    },
    fetchPolicy: "no-cache",
    onCompleted() {
      setSensor(data?.sensor || ({} as Sensor));
      socket.on(data?.sensor?._id || "", (payload: Sensor) => {
        setSensor(payload);
      });
    },
  });

  if (!data) return null;

  return (
    <Container borders={borders}>
      Current <br />
      {`${sensor.temperature}°C`}
    </Container>
  );
};

export default CurrentTemp;

const request = gql`
  query GetSetpoints($room: String) {
    sensor: getSensor(room: $room) {
      temperature
      _id
    }
  }
`;

type GqlResponse = {
  sensor: {
    temperature: number;
    _id: string;
  };
};

type Sensor = {
  temperature: number;
  connected?: boolean;
  _id: string;
};

const Container = styled.div`
  border: ${({ borders }: { borders: boolean }) => (borders ? "1px solid white" : "none")};
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;
