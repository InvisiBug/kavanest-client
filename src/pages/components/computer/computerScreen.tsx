import React, { FC, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { PageTitle, PageContents, PlugSelector } from "src/lib/components";
import { AudioSelector } from "./components";

const Computer: FC<any> = () => {
  const [computerAudio, setComputerAudio] = useState<any>();
  const [computerPower, setComputerPower] = useState<any>();
  const [openDetails, setOpenDetails] = useState<string>("");

  const { data } = useQuery(query, {
    fetchPolicy: "no-cache",
    variables: { name: "computerPower" },
    onCompleted() {
      setComputerAudio(data.getComputerAudio);
      setComputerPower(data.getPlug);
    },
  });

  const socketUpdate = (_id: any, payload: any) => {
    switch (payload.name) {
      case "computerAudio":
        setComputerAudio(payload);
        break;
      case "computerPower":
        setComputerPower(payload);
        break;
    }
  };

  if (!computerAudio || !computerPower) return <></>;
  return (
    <>
      <PageTitle desc={"Computer power & audio"}>Computer</PageTitle>
      <PageContents>
        <PlugSelector
          thisPlug={{
            ...computerPower,
            name: "Power",
          }}
          mqttNameOverride={"computerPower"}
          socketUpdate={socketUpdate}
          openDetails={openDetails}
          margin={false}
          setOpenDetails={setOpenDetails}
        />
        <AudioSelector
          data={{
            ...computerAudio,
            name: "Speakers",
          }}
          socketUpdate={socketUpdate}
          openDrawer={openDetails}
          setOpenDrawer={setOpenDetails}
        />
      </PageContents>
    </>
  );
};

export default Computer;

const query = gql`
  query ($name: String) {
    getComputerAudio {
      name
      left
      right
      sub
      mixer
      connected
      _id
    }
    getPlug(name: $name) {
      name
      state
      connected
      _id
    }
  }
`;
