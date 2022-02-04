import React, { useState } from "react";
import { PageTitle } from "../../lib";
import RoomSelector from "./components/selector";
import RoomSetpoints from "./components/setpoints";
import { useQuery, gql } from "@apollo/client";
import { SelectorContainer } from "../../lib";

const SetpointsPage: React.FC = () => {
  const { data } = useQuery(getValves, { fetchPolicy: "no-cache" });
  const [roomToShow, setRoomToShow] = useState<false | string>(false);

  if (!data) return <></>;

  const heating = data.heating;
  console.log(heating);

  console.log(data);
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
          <PageTitle key={Math.random()} desc={heating.connected ? "Each room shown here is on the system" : "Heating isn't connected 💥"}>
            Room Heating Setpoints
          </PageTitle>

          <SelectorContainer>
            {data.getValves.length > 0 ? (
              data.getValves.map((room: any) => {
                return <RoomSelector data={room} key={Math.random()} onClick={() => setRoomToShow(room.room)} close={() => setRoomToShow(false)} />;
              })
            ) : (
              <h1>No valves found</h1>
            )}
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
    heating: getPlug(name: "heating") {
      name
      state
      connected
    }
  }
`;
