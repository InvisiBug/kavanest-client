import React, { useState } from "react";
import { PageTitle } from "../../lib";
import { useQuery, gql } from "@apollo/client";
import RoomSelector from "./components/roomSelector";

const Plugs: React.FC<Props> = () => {
  const { loading, error, data } = useQuery(getPlugs, { fetchPolicy: "no-cache" });
  const [openPlug, setOpenPlug] = useState<string>("");

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <PageTitle desc={"Simple on / off plugs"}>Plugs</PageTitle>
      {data.response.map((plug: any) => {
        return <RoomSelector plug={plug} openPlug={openPlug} setOpenPlug={(name) => setOpenPlug(name)} key={Math.random()} />;
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
    }
  }
`;
