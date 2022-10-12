import React, { useState } from "react";
import RoomScreen from "./components/roomScreen";
import { useQuery, gql } from "@apollo/client";
import SelectorScreen from "./components/selectorScreen";
import { Plug } from "src/lib/types";

const SetpointsPage: React.FC = () => {
  const { data } = useQuery<GraphqlResponse>(getValves, { fetchPolicy: "no-cache" });
  const [roomToShow, setRoomToShow] = useState<false | string>(false);
  console.log(roomToShow);

  if (!data) return <></>;
  const roomsWithValves = data.getValves;

  const showRoomScreen = (roomToShow: string, possibleRooms: any) => {
    for (let room in possibleRooms) {
      if (possibleRooms[room].room === roomToShow) {
        return (
          <>
            <RoomScreen close={() => setRoomToShow(false)} name={possibleRooms[room].room} key={Math.random()} />
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
    getValves {
      room
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
  getValves: Plug;
};
