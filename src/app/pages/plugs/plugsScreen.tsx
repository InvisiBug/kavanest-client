import React, { FC, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { PageTitle, PageContents, PlugSelector } from "../../lib";

/*
  Make a graphql request for all Plugs
  Create a selector for each plug and provide initial data
*/
const PlugsScreen: FC = () => {
  const [openDetails, setOpenDetails] = useState<string>("");
  const [plugs, setPlugs] = useState<any[]>();

  const { data } = useQuery(getPlugs, {
    fetchPolicy: "no-cache",
    onCompleted() {
      setPlugs(data.plugs);
    },
  });

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
      <PageContents>
        {plugs.map((plug: any) => {
          return (
            <PlugSelector
              thisPlug={plug}
              socketUpdate={socketUpdate}
              openDetails={openDetails}
              setOpenDetails={setOpenDetails}
              margin={false}
              key={Math.random()}
            />
          );
        })}
      </PageContents>
    </>
  );
};

export default PlugsScreen;

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
