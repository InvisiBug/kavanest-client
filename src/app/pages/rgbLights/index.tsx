import React from "react";
import { PageTitle } from "../../lib";
import { useQuery, gql } from "@apollo/client";

const RGBLights: React.FC<any> = () => {
  const { loading, error, data } = useQuery(getPlugs, { fetchPolicy: "no-cache" });

  return (
    <>
      <PageTitle>RGB Lights</PageTitle>
    </>
  );
};

export default RGBLights;

const getPlugs = gql`
  query {
    response: getPlugs {
      name
    }
  }
`;
