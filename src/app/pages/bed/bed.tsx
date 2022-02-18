import React, { FC, useState } from "react";
import { PageTitle, PageContents, PlugSelector } from "../../lib";
import { useQuery, gql } from "@apollo/client";

import Countdown from "./components/countdown";
import Buttons from "./components/times";

const Bed: FC = () => {
  const [timerVal, setTimerVal] = useState();

  const { data, refetch } = useQuery(query, {
    fetchPolicy: "no-cache",
    variables: { name: "mattress" },
    onCompleted() {
      console.log(data.response.value);
      setTimerVal(data.response.value);
      console.log(data.plug);
    },
  });

  if (!timerVal) return <></>;

  return (
    <>
      <PageTitle desc={"Our heated mattress controller"}>Bed</PageTitle>
      <PageContents>
        <Countdown time={timerVal} />
        <Buttons refetch={refetch} />
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
