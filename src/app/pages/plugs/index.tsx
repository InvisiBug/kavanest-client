import React, { FC, useState } from "react";
import { PageTitle, SelectorContainer } from "../../lib";
import { useQuery, gql } from "@apollo/client";
import RoomSelector, { PlugData } from "./components/selector";

/*
  Make a graphql request for all Plugs
  Create a selector for each plug and provide initial data
*/
const Plugs: FC = () => {
  const [openDetails, setOpenDetails] = useState<string>("");
  const [plugs, setPlugs] = useState<PlugData[]>();

  const { data } = useQuery(getPlugs, {
    fetchPolicy: "no-cache",
    onCompleted() {
      setPlugs(data.plugs);
    },
  });

  /*
    Socket data coming in.
    Take a copy of the the current data array,
    update only the data received via the socket (using _id as a key)
    save the new array over the old one
  */
  const socketUpdate = (_id: any, payload: any) => {
    if (!plugs) return;
    const updatedPlugs: Array<any> = [...plugs];

    updatedPlugs.map((plug, index) => {
      if (plug._id === _id) {
        updatedPlugs[index] = payload;
      }
      return plug;
    });

    setPlugs(updatedPlugs);
  };

  if (!plugs) return <></>;

  return (
    <>
      <PageTitle desc={"Simple on / off plugs"}>Plugs</PageTitle>
      <SelectorContainer>
        {plugs.map((plug: any) => {
          return (
            <RoomSelector thisPlug={plug} socketUpdate={socketUpdate} openDetails={openDetails} setOpenDetails={setOpenDetails} key={Math.random()} />
          );
        })}
      </SelectorContainer>
    </>
  );
};

export default Plugs;

const getPlugs = gql`
  query {
    plugs: getPlugs {
      name
      connected
      state
      _id
    }
  }
`;
