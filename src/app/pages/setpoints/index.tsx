import React, { useEffect, useState } from "react";
import { PageTitle } from "../../lib";
import RoomSetpointSelection from "./components/roomSelector";
import { asyncRequest } from "../../utils";
import RoomSetpoints from "./components/roomSetpoints";

const SetpointsPage: React.FC = () => {
  const [roomWithValve, setRoomWithValve] = useState<any>(null);
  const [roomToShow, setRoomToShow] = useState<any>(false);

  useEffect(() => {
    asyncRequest(whereAreTheValves, setRoomWithValve);
  }, []);

  const showAllRooms = (roomWithValve: any) => {
    const arr: any = [
      <PageTitle key={Math.random()} desc={"Each room shown here has a valve"}>
        Room Heating Setpoints
      </PageTitle>,
    ];

    roomWithValve.forEach((room: any) => {
      arr.push(<RoomSetpointSelection data={room} key={Math.random()} onClick={() => setRoomToShow(room.room)} close={() => setRoomToShow(false)} />);
    });
    return arr;
  };

  const showRoomSetpoints = (roomToShow: string) => {
    for (let rooms in roomWithValve) {
      if (roomWithValve[rooms].room === roomToShow) {
        return (
          <>
            <RoomSetpoints close={() => setRoomToShow(false)} room={roomWithValve[rooms].room} key={Math.random()} />
          </>
        );
      }
    }
  };

  if (!roomWithValve) return <></>;

  if (!roomToShow) {
    return showAllRooms(roomWithValve);
  } else {
    return showRoomSetpoints(roomToShow);
  }
};

export default SetpointsPage;

const whereAreTheValves: string = `
  query GetValves {
    response:getValves {
      room
      state
    }
  }
`;
