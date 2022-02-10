import React, { FC, useState } from "react";
import { PageTitle, SelectorContainer } from "../../lib";
import { useQuery, gql } from "@apollo/client";
// import RoomSelector, { PlugData } from "./components/roomSelector";
import PlugSelector from "../plugs/components/roomSelector";

/*
  Make a graphql request for all Plugs
  Create a selector for each plug and provide initial data
*/
const Bed: FC = () => {
  // const [openDetails, setOpenDetails] = useState<string>("");
  const [timer, setTimer] = useState<any>();
  const [mattressPower, setMattressPower] = useState<any>();

  const { data } = useQuery(query, {
    fetchPolicy: "no-cache",
    variables: { name: "mattress" },
    onCompleted() {
      setTimer(data.response);
      setMattressPower(data.plug);
    },
  });

  // if (!plugs) return <></>;
  if (!timer) return <></>;

  const { value: mattressTimer } = timer;
  const now = new Date().getTime();

  // setTimeDifference(`${mm}:${ss}`);

  console.log((mattressTimer - now) / 1000 / 60);

  return (
    <>
      <PageTitle desc={"Our heated mattress controller"}>Bed</PageTitle>
      <SelectorContainer>
        {/* <PlugSelector thisPlug={mattressPower} key={Math.random()} /> */}
        <div>{calcTimeDifference(now, mattressTimer)}</div>
        {/* {plugs.map((plug: any) => {
          return (
            <RoomSelector thisPlug={plug} socketUpdate={socketUpdate} openDetails={openDetails} setOpenDetails={setOpenDetails} key={Math.random()} />
          );
        })} */}
      </SelectorContainer>
    </>
  );
};

const calcTimeDifference = (now: any, mattress: any) => {
  const difference = mattress - now;

  if (difference < -1) return "Off";

  var msec = difference;

  var hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  var mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  var ss = Math.floor(msec / 1000);
  msec -= ss * 1000;

  return `${mm}:${ss}`;
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
