import React, { FC, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { PageTitle } from "../../lib";
import Selector from "./components/selector";

const Computer: FC<any> = () => {
  const [computerAudio, setComputerAudio] = useState<any>();

  const { data } = useQuery(getPlugs, {
    fetchPolicy: "no-cache",
    onCompleted() {
      setComputerAudio(data.response);
    },
  });

  if (!computerAudio) return <></>;

  return (
    <>
      <PageTitle desc={"Computer power & audio"}>Computer</PageTitle>
      <Selector data={computerAudio} />
    </>
  );
};

export default Computer;

const getPlugs = gql`
  query {
    response: getComputerAudio {
      name
      left
      right
      sub
      mixer
      connected
      _id
    }
  }
`;
