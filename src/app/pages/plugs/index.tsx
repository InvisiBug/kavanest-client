import React, { useState } from "react";
import { PageTitle } from "../../lib";
import { useQuery, gql } from "@apollo/client";
import RoomSelector from "./components/roomSelector";

const Plugs: React.FC<Props> = () => {
  const { loading, error, data } = useQuery(getPlugs, { fetchPolicy: "no-cache" });
  // const [openPlug, setOpenPlug] = useState<string>("");

  if (loading) return <></>;
  if (error) return <p>Error</p>;

  return (
    <>
      <PageTitle desc={"Simple on / off plugs"}>Plugs</PageTitle>
      {/* <RoomSelector plug={{ name: "sun" }} openPlug={openPlug} setOpenPlug={(name) => setOpenPlug(name)} key={Math.random()} /> */}
      {data.response.map((plug: any) => {
        return <RoomSelector plug={plug} key={Math.random()} />;
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
    }
  }
`;
