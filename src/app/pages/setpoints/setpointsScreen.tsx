import React, { useState } from "react";
import RoomSetpoints from "./components/setpoints";
import { useQuery, gql } from "@apollo/client";
import SelectorScreen from "./selectorScreen";

const SetpointsPage: React.FC = () => {
  const { data } = useQuery(getValves, { fetchPolicy: "no-cache" });
  const [roomToShow, setRoomToShow] = useState<false | string>(false);

  if (!data) return <></>;

  const showRoomSetpoints = (roomToShow: string, possibleRooms: any) => {
    for (let room in possibleRooms) {
      if (possibleRooms[room].room === roomToShow) {
        return (
          <>
            <RoomSetpoints close={() => setRoomToShow(false)} room={possibleRooms[room].room} key={Math.random()} />
          </>
        );
      }
    }
  };

  return <>{!roomToShow ? <SelectorScreen setRoomToShow={setRoomToShow} /> : showRoomSetpoints(roomToShow, data.getValves)}</>;
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
