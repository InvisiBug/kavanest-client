import React, { FC, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { PageTitle, PageContents } from "@/lib/components";
import { AudioSelector } from "./components";

const Computer: FC<any> = () => {
  const [computerAudio, setComputerAudio] = useState<any>();
  const [openDetails, setOpenDetails] = useState<string>("");

  const { data } = useQuery<Data>(query, {
    fetchPolicy: "no-cache",

    onCompleted() {
      setComputerAudio(data?.getComputerAudio);
    },
  });

  const socketUpdate = (_id: string, payload: any) => {
    switch (payload.name) {
      case "computerAudio":
        setComputerAudio(payload);
        break;
    }
  };

  if (!computerAudio) return <></>;

  return (
    <>
      <PageTitle desc={"Computer power & audio"}>Computer</PageTitle>
      <PageContents>
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

type Data = {
  getComputerAudio: {
    name: string;
    left: boolean;
    right: boolean;
    sub: boolean;
    mixer: boolean;
    _id: string;
  };
};

const query = gql`
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
