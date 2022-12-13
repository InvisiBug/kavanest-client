import React, { FC, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { PageTitle, PageContents, PlugSelectorV2 as PlugSelector, TimerCountdown } from "src/lib/components";
import { Times } from "src/lib/components";

const Bed: FC = () => {
  const [timerVal, setTimerVal] = useState();
  const [updateTimerVal] = useMutation(updateTimerMutation, {});

  const { data, refetch } = useQuery(query, {
    fetchPolicy: "no-cache",
    variables: { name: "mattress" },
    onCompleted() {
      setTimerVal(data.response.value);
    },
  });

  if (!timerVal) return null;

  const updateTime = (newTime: number) => {
    updateTimerVal({
      variables: {
        input: {
          name: "mattress",
          value: newTime,
        },
      },
    });

    refetch();
  };

  return (
    <>
      <PageTitle desc={"Our heated mattress controller"}>Bed</PageTitle>
      <PageContents>
        <Times updateTimer={updateTime}>Please select a time</Times>
        <TimerCountdown time={timerVal}>Time Remaining</TimerCountdown>
        <PlugSelector data={data.plug} margin={false} />
      </PageContents>
    </>
  );
};

export default Bed;

const query = gql`
  query ($name: String) {
    response: getTimer(name: $name) {
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
