import React, { useState } from "react";
import { PageTitle } from "../../lib";
import { useQuery, gql } from "@apollo/client";
import RoomSelector from "./components/roomSelector";

/*
  Make a graphql request for all Plugs
  Create a selector for each plug and provide initial data
*/
const Plugs: React.FC<Props> = () => {
  const { loading, error, data, refetch } = useQuery(getPlugs, { fetchPolicy: "no-cache" });
  const [openPlug, setOpenPlug] = useState<string>("");

  if (loading) return <></>;
  if (error) return <p>Error</p>;

  return (
    <>
      <PageTitle desc={"Simple on / off plugs"}>Plugs</PageTitle>
      {data.response.map((plug: any) => {
        return <RoomSelector plug={plug} refetch={refetch} openPlug={openPlug} setOpenPlug={setOpenPlug} key={Math.random()} />;
      })}
    </>
  );
};

export default Plugs;

export interface Props {}

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
