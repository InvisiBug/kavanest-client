import React, { useState } from "react";
import { PageTitle, PageContents, PlugSelector } from "src/lib/components";
import { useQuery, gql } from "@apollo/client";
import { Plug } from "src/lib/gqlTypes";

const Valves = () => {
  const [valves, setValves] = useState<any>();

  const { data } = useQuery<GraphqlResponse>(getValves, {
    fetchPolicy: "no-cache",
    onCompleted() {
      console.log(data);
      setValves(data?.valves);
    },
  });

  if (!valves) return <></>;

  return (
    <>
      <PageTitle desc={"Current valve states"}>Valves</PageTitle>
      <PageContents>
        {valves.map((valve: any) => {
          // return <ValveSelector thisValve={valve} margin={false} key={Math.random()} />;
          return <PlugSelector thisPlug={valve} key={Math.random()} />;
        })}
      </PageContents>
    </>
  );
};

export default Valves;

const getValves = gql`
  query {
    valves: getRadiators {
      name
      connected
      valve
      temperature
    }
  }
`;

type GraphqlResponse = {
  valves: Plug;
};
