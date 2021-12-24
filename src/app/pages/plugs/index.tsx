import React, { useState } from "react";
import { PageTitle } from "../../lib";
import { useQuery, gql } from "@apollo/client";
import RoomSelector, { PlugData } from "./components/roomSelector";

/*
  Make a graphql request for all Plugs
  Create a selector for each plug and provide initial data
*/
const Plugs: React.FC = () => {
  const [openDetails, setOpenDetails] = useState<string>("");
  const [plugs, setPlugs] = useState<PlugData[] | null>(null);

  const { data } = useQuery(getPlugs, {
    fetchPolicy: "no-cache",
    onCompleted() {
      setPlugs(data.response);
    },
  });

  if (!plugs) return <></>;

  return (
    <>
      <PageTitle desc={"Simple on / off plugs"}>Plugs</PageTitle>
      {plugs.map((plug: any) => {
        return (
          <RoomSelector
            thisPlug={plug}
            allPlugs={plugs}
            setAllPlugs={setPlugs}
            openDetails={openDetails}
            setOpenDetails={setOpenDetails}
            key={Math.random()}
          />
        );
      })}
    </>
  );
};

export default Plugs;

const getPlugs = gql`
  query {
    response: getPlugs {
      name
      connected
      state
      _id
    }
  }
`;
