import { FC, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useQuery, gql } from "@apollo/client";
import { useAppContext } from "@/lib/context";
import { flame } from "@/lib/components";
import { Heating, Radiator } from "@/lib/gqlTypes";

const FlameIcon: FC<Props> = ({ name, borders = false }) => {
  const [heating, setHeating] = useState<Heating>({});
  const [radiator, setRadiator] = useState<Radiator>({});
  const { socket } = useAppContext();

  const { data } = useQuery<GqlResponse>(request, {
    variables: {
      room: name,
    },
    fetchPolicy: "no-cache",
    onCompleted() {
      setHeating(data?.heating || ({} as Heating));
      setRadiator(data?.radiator || ({} as Radiator));

      socket.on(data?.heating?._id || "", (payload: Heating) => {
        setHeating(payload);
      });

      socket.on(data?.radiator?._id || "", (payload: Radiator) => {
        setRadiator(payload);
      });
    },
  });

  useEffect(() => {
    return function cleanup() {
      socket.removeAllListeners();
    };
  }, [socket]);

  // console.log(heating, radiator);

  if (!data) return null;

  return (
    <div>
      {heating.state && heating.connected && !radiator.valve && radiator.connected ? (
        <Container src={flame} borders={borders} />
      ) : (
        <NoFlameContainer />
      )}
    </div>
  );
};

export default FlameIcon;

type Props = {
  name: string;
  borders?: boolean;
};

const request = gql`
  query GetRadiatorNHeating($room: String) {
    radiator: getRadiator(name: $room) {
      valve
      connected
      _id
    }
    heating: getPlug(name: "heating") {
      state
      connected
      _id
    }
  }
`;

type GqlResponse = {
  radiator: Radiator;
  heating: Heating;
};

const Container = styled.img`
  border: ${({ borders }: { borders: boolean }) => (borders ? "1px solid brown" : "none")};
  height: 35px;
`;

const NoFlameContainer = styled.div`
  min-height: 35px;
`;
