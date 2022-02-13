import React, { FC } from "react";
import { PageTitle, SelectorContainer } from "../../lib";
import { useQuery, gql } from "@apollo/client";
import { calcTimeDifference } from "./components/countdown";
// import RoomSelector, { PlugData } from "./components/roomSelector";

import Countdown from "./components/countdown";
import Buttons from "./components/times";

/*
  Make a graphql request for all Plugs
  Create a selector for each plug and provide initial data
*/
const Bed: FC = () => {
  // const [mattressPower, setMattressPower] = useState<any>();

  const { data, refetch } = useQuery(query, {
    fetchPolicy: "no-cache",
    variables: { name: "mattress" },
    // onCompleted() {
    //   // setMattressPower(data.plug);
    // },
  });

  // if (!plugs) return <></>;
  if (!data) return <></>;

  const timerValue = data.response.value;

  const countdownTime = new Date(timerValue).getTime();
  const now = new Date().getTime();

  console.log(calcTimeDifference(now, countdownTime));

  return (
    <>
      <PageTitle desc={"Our heated mattress controller"}>Bed</PageTitle>
      <SelectorContainer>
        {/* <PlugSelector thisPlug={mattressPower} key={Math.random()} /> */}
        <Countdown time={timerValue} update={refetch} />
        <Buttons />
      </SelectorContainer>
    </>
  );
};

export default Bed;

const query = gql`
  query ($name: String) {
    response: getTimer(name: $name) {
      value
    }
    plug: getPlug(name: $name) {
      name
      state
      connected
      _id
    }
  }
`;
