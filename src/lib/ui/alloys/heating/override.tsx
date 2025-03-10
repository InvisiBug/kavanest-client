import { FC, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import Times from "../../elements/times";
import { useHeating } from "./heating";
import CountdownTimer from "../../elements/timerCountdown";
import OverrideType from "../../elements/overrideTypeSelector";

const OverrideControls: FC = () => {
  const { name } = useHeating();

  const [updateOverrideTime] = useMutation(overrideTimeMutation, {});
  const [updateOverrideType] = useMutation(overrideTypeMutation, {});

  const [overrideTime, setOverrideTime] = useState("");
  const [overrideType, setOverrideType] = useState("");

  const { data, refetch } = useQuery(request, {
    variables: { room: name },
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true, // Needed for some reason
    onCompleted() {
      if (data.room) {
        // console.log(data.room.overrideTime);
        setOverrideTime(data.room.overrideTime);
        setOverrideType(data.room.overrideType);
      }

      // setOverrideTime(String(Date.now()));
      // setOverrideType("heating-on");
    },
  });

  if (!data) return <></>;

  const updateTime = (newTime: number) => {
    console.log("🚀 ~ updateTime ~ newTime:", newTime);

    updateOverrideTime({
      variables: {
        input: {
          name,
          overrideTime: newTime,
        },
      },
    });

    refetch();
  };

  const updateType = (newType: string) => {
    updateOverrideType({
      variables: {
        input: {
          name,
          overrideType: newType,
        },
      },
    });

    refetch();
  };

  return (
    <Container>
      <h4>Room Override Controls</h4>
      <TimeContainer>
        <OverrideType currentType={overrideType} types={["on", "off", "passive"]} updateType={updateType} />
      </TimeContainer>
      <Times updateTimer={updateTime} times={[0.01, 15, 60, 120, 0.05]} />
      <CountdownTimer time={overrideTime}>Remaining Time</CountdownTimer>
    </Container>
  );
};

export default OverrideControls;

const request = gql`
  query ($room: String) {
    room: getRoom(name: $room) {
      overrideTime
      overrideType
    }
  }
`;

const overrideTimeMutation = gql`
  mutation ($input: RoomInput) {
    updateRoom(input: $input) {
      overrideTime
    }
  }
`;

const overrideTypeMutation = gql`
  mutation ($input: RoomInput) {
    updateRoom(input: $input) {
      overrideType
    }
  }
`;

const borders = false;

const Container = styled.div`
  border: ${borders ? "1px solid purple" : "none"};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid grey;
`;

const TimeContainer = styled.div`
  padding: 1rem;
`;
