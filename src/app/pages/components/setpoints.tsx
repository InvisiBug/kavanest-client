import React, { useLayoutEffect, useState } from "react";
import { PageTitle } from "../../atoms";
import { RoomSetpointSelection } from "../../orgamisms";
import { asyncRequest } from "../../utils";
import { RoomSetpoints } from "../../templates";

const SetpointsPage: React.FC = () => {
  const [data, setData] = useState<any | null | void>(null);
  const [roomToShow, setRoomToShow] = useState<any | null | void>(false);

  useLayoutEffect(() => {
    asyncRequest(query, setData);
  }, []);

  const showAllRooms = (data: any) => {
    const arr: any = [<PageTitle key={Math.random()}>Room Heating Setpoints</PageTitle>];

    data.forEach((room: any) => {
      arr.push(<RoomSetpointSelection data={room} key={Math.random()} onClick={() => setRoomToShow(room.room)} close={() => setRoomToShow(false)} />);
    });
    return arr;
  };

  const showRoomSetpoints = (roomToShow: string) => {
    for (let rooms in data) {
      if (data[rooms].room === roomToShow) {
        return (
          <>
            <RoomSetpoints close={() => setRoomToShow(false)} name={data[rooms].room} key={Math.random()} />
          </>
        );
      }
    }
  };

  if (!data) return <></>;

  if (!roomToShow) {
    return showAllRooms(data);
  } else {
    return showRoomSetpoints(roomToShow);
  }
};

export default SetpointsPage;

const query: string = `
  query GetAllSetpoints {
    response:getAllSetpoints {
      room
    }
  }
`;
