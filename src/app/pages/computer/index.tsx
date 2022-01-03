import React, { FC, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { PageTitle, SelectorContainer } from "../../lib";
import Selector from "./components/selector";

const Computer: FC<any> = () => {
  const [computerAudio, setComputerAudio] = useState<any>();

  const { data } = useQuery(getPlugs, {
    fetchPolicy: "no-cache",
    onCompleted() {
      setComputerAudio(data.getComputerAudio);
    },
  });

  const socketUpdate = (_id: any, payload: any) => {
    setComputerAudio(payload);
  };

  if (!computerAudio) return <></>;

  return (
    <>
      <PageTitle desc={"Computer power & audio"}>Computer</PageTitle>
      <SelectorContainer>
        <Selector data={computerAudio} socketUpdate={socketUpdate} />
      </SelectorContainer>
    </>
  );
};

export default Computer;

const getPlugs = gql`
  query {
    getComputerAudio {
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
