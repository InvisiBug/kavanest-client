import React, { useState } from "react";
import RoomScreen from "./components/roomScreen";
import { useQuery, gql } from "@apollo/client";
import SelectorScreen from "./components/selectorScreen";
import { Plug } from "src/lib/types";

const SetpointsPage: React.FC = () => {
  const { data } = useQuery<GraphqlResponse>(getValves, { fetchPolicy: "no-cache" });
  const [roomToShow, setRoomToShow] = useState<false | string>(false);

  if (!data) return <></>;
  const roomsWithValves = data.radiators;

  const showRoomScreen = (roomToShow: string, possibleRooms: any) => {
    for (const room of possibleRooms) {
      const { name: roomName } = room;

      if (roomName === roomToShow) {
        return (
          <>
            <RoomScreen close={() => setRoomToShow(false)} name={roomName} key={Math.random()} />
          </>
        );
      }
    }
  };

  return <>{!roomToShow ? <SelectorScreen setRoomToShow={setRoomToShow} /> : showRoomScreen(roomToShow, roomsWithValves)}</>;
};

export default SetpointsPage;

const getValves = gql`
  query {
    radiators: getRadiators {
      name
    }
    heating: getPlug(name: "heating") {
      name
      state
      connected
    }
  }
`;

type GraphqlResponse = {
  heating: Plug;
  radiators: Plug;
};
