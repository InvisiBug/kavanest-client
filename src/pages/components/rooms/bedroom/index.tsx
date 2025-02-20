import { FC, useState, useRef } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { PlugSelectorV2 as PlugSelector, RoomHeating, RGBLightSelector, Times, TimerCountdown } from "@/lib/ui";
import { Plug, RGBLight } from "@/lib/gqlTypes";
import styled from "@emotion/styled";
import { mq, px } from "@/lib/mediaQueries";
import { useDimensions } from "@/lib/helpers/useDimension";

const filteredData = (data: any) => {
  return data.filter((item: any) => ["deskLEDs", "tableLamp", "screenLEDs"].includes(item.name));
};

const Study: FC = () => {
  const [bedroomLamp, setBedroomLamp] = useState<Plug | undefined>(undefined);
  const [timerVal, setTimerVal] = useState();

  const [updateTimerVal] = useMutation(updateTimerMutation, {});

  const ref = useRef(null);
  const { width, height } = useDimensions(ref);

  const { data } = useQuery(getLights, {
    fetchPolicy: "no-cache",
    variables: {
      name1: "bedRoomLamp",
    },
    onCompleted() {
      console.log(data);
      setBedroomLamp(data.lamp);
    },
  });

  const { data: data2, refetch } = useQuery(query, {
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
    variables: { name: "mattress" },
    onCompleted() {
      setTimerVal(data2.timer.value);
    },
  });

  const updateTime = (newTime: number) => {
    updateTimerVal({
      variables: {
        input: {
          name: "mattress",
          value: newTime,
        },
      },
    });

    console.log("Here");

    refetch();
  };

  return (
    <>
      <Container ref={ref} width={width}>
        <Left>
          <h1>Bed</h1>

          <Times updateTimer={updateTime} times={[0.01, 10, 20, 45]}>
            Please select a time
          </Times>
          <TimerCountdown time={timerVal || "0"}>Time Remaining</TimerCountdown>
          {data2?.plug ? <PlugSelector initialData={data2.plug} margin={false} /> : null}
        </Left>

        <Right>
          <h1>Lights</h1>

          {bedroomLamp && <PlugSelector initialData={bedroomLamp} />}
        </Right>
      </Container>
    </>
  );
};

export default Study;

const Container = styled.div<{ width: number }>`
  display: flex;
  ${mq("large")} {
    flex-direction: row;
    justify-content: space-around;
  }
  flex-direction: ${({ width }) => (width > 1000 ? "column" : "row")};
  flex-direction: column;
`;

const Left = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* height: 100%; */
  background-color: #1f1f1f;

  ${mq("large")} {
    width: 45%;
  }
`;

const Right = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  ${mq("large")} {
    width: 45%;
  }
  height: 100%;
  background-color: #1f1f1f;
`;

const getLights = gql`
  query ($name1: String) {
    lamp: getPlug(name: $name1) {
      name
      state
      connected
      _id
    }
  }
`;

const query = gql`
  query GetMattress($name: String) {
    timer: getTimer(name: $name) {
      value
    }
    plug: getPlug(name: "mattress") {
      name
      state
      connected
      _id
    }
  }
`;

const updateTimerMutation = gql`
  mutation UpdateTimer($input: TimerInput) {
    updateTimer(input: $input) {
      value
      name
    }
  }
`;
