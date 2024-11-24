import React, { FC, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { PageTitle, PageContents, PlugSelectorV2 as PlugSelector, TimerCountdown } from "@/lib/components";
import { Times } from "@/lib/components";

const Bed: FC = () => {
  const [timerVal, setTimerVal] = useState();

  const [updateTimerVal] = useMutation(updateTimerMutation, {});

  const { data, refetch } = useQuery(query, {
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
    variables: { name: "mattress" },
    onCompleted() {
      setTimerVal(data.timer.value);
    },
  });

  // if (!timerVal) return null;

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
      <PageTitle desc={"My heated mattress controller"}>Bed</PageTitle>
      <PageContents>
        <Times updateTimer={updateTime} times={[0.01, 10, 20, 45]}>
          Please select a time
        </Times>
        <TimerCountdown time={timerVal || "0"}>Time Remaining</TimerCountdown>
        {data?.plug ? <PlugSelector data={data.plug} margin={false} /> : null}
      </PageContents>
    </>
  );
};

export default Bed;

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
