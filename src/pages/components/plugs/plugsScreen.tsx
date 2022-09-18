import React, { FC, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { PageTitle, PageContents, PlugSelectorV2 as PlugSelector } from "../../../lib";

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

  if (!plugs) return <></>;

  return (
    <>
      <PageTitle desc={"Simple on / off plugs"}>Plugs</PageTitle>
      <PageContents>
        {plugs.map((plug: any) => {
          return <PlugSelector data={plug} openDetails={openDetails} setOpenDetails={setOpenDetails} margin={false} key={Math.random()} />;
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
