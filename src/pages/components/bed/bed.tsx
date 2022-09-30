import React, { FC, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { PageTitle, PageContents, PlugSelectorV2 as PlugSelector } from "src/lib";

import { Countdown, Times as Buttons } from "./components";

const Bed: FC = () => {
  const [timerVal, setTimerVal] = useState();

  const { data, refetch } = useQuery(query, {
    fetchPolicy: "no-cache",
    variables: { name: "mattress" },
    onCompleted() {
      setTimerVal(data.response.value);
    },
  });

  if (!timerVal) return <></>;

  return (
    <>
      <PageTitle desc={"Our heated mattress controller"}>Bed</PageTitle>
      <PageContents>
        <Buttons refetch={refetch} />
        <Countdown time={timerVal} />
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
