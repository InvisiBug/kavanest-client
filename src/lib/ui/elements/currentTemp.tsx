import { FC, useState } from "react";
import styled from "@emotion/styled";
import { useQuery, gql } from "@apollo/client";
import { useAppContext } from "@/lib/context";
import { Sensor } from "@/lib/gqlTypes";
import { textColour } from "@/lib/constants";
// import { Thermometer } from "@/lib/components";

const CurrentTemp: FC<Props> = ({ name, borders = false }) => {
  const { socket } = useAppContext();
  const [sensor, setSensor] = useState<Sensor>({} as Sensor);

  const { data } = useQuery<GqlResponse>(request, {
    variables: {
      room: name,
    },
    fetchPolicy: "no-cache",
    onCompleted() {
      setSensor(data?.sensor || ({} as Sensor));

      socket.on(String(data?.sensor?._id), (payload: Sensor) => {
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

type Props = {
  name: string;
  borders?: boolean;
};

const request = gql`
  query GetTemperature($room: String) {
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

const Container = styled.div`
  border: ${({ borders }: { borders: boolean }) => (borders ? "1px solid white" : "none")};
  font-size: 1rem;
  text-align: center;
  color: ${textColour};
`;
