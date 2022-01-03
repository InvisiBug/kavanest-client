import React, { useState } from "react";
import { PageTitle } from "../../lib";
import RoomSelector from "./components/roomSelector";
import RoomSetpoints from "./components/roomSetpoints";
import { useQuery, gql } from "@apollo/client";
import { SelectorContainer } from "../../lib";

const SetpointsPage: React.FC = () => {
  const { data } = useQuery(getValves, { fetchPolicy: "no-cache" });
  const [roomToShow, setRoomToShow] = useState<any>(false);

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

  return (
    <>
      {!roomToShow ? (
        <>
          <PageTitle key={Math.random()} desc={"Each room shown here is on the system"}>
            Room Heating Setpoints
          </PageTitle>

          <SelectorContainer>
            {data.getValves.map((room: any) => {
              return <RoomSelector data={room} key={Math.random()} onClick={() => setRoomToShow(room.room)} close={() => setRoomToShow(false)} />;
            })}
          </SelectorContainer>
        </>
      ) : (
        showRoomSetpoints(roomToShow, data.getValves)
      )}
    </>
  );
};

export default SetpointsPage;

const getValves = gql`
  query {
    getValves {
      room
    }
  }
`;
