import React, { FC } from "react";
import styled from "@emotion/styled";
import { useQuery, gql } from "@apollo/client";
import { getCurrentSetpointV2 as getCurrentSetpoint } from "@/lib/api";
import { textColour } from "@/lib/constants";

const HeatingTarget: FC<Props> = ({ name, borders = false }) => {
  const { data } = useQuery<GqlResponse>(request, {
    variables: {
      room: name,
    },
    fetchPolicy: "no-cache",
  });

  // console.log(name, data);

  if (!data || !data.room) return <p>No target set</p>;

  const { setpoints } = data.room;

  const targetVal = getCurrentSetpoint(setpoints)![1];

  return (
    <Container borders={borders}>
      Target
      <br /> <TargetVal val={targetVal}>{targetVal > 5 ? `${targetVal}°C` : "Off"}</TargetVal>
    </Container>
  );
};

export default HeatingTarget;

type Props = {
  name: string;
  borders?: boolean;
};

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
  color: ${textColour};
  text-align: center;
`;

const TargetVal = styled.div`
  color: ${({ val }: { val: number }) => (val >= 0 ? "white" : "grey")};
`;
