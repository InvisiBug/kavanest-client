import React, { useLayoutEffect, useState } from "react";
import { PageTitle } from "../../atoms";
import { Setpoint } from "../../orgamisms";
import { asyncRequest } from "../../utils";
import { RoomSetpoints } from "../../templates";

const SetpointsPage: React.FC = () => {
  const [data, setData] = useState<any | null | void>(null);
  const [details, setDetails] = useState<any | null | void>(false);

  useLayoutEffect(() => {
    asyncRequest(query, setData);
  }, []);

  if (!data) return <></>;

  const showRoomSetpoints = () => {
    for (let rooms in data) {
      if (data[rooms].room === details) {
        return (
          <>
            <RoomSetpoints close={() => setDetails(false)} name={data[rooms].room} key={Math.random()} />
          </>
        );
      }
    }
  };

  const showAllRooms = (data: any) => {
    const arr: any = [<PageTitle key={Math.random()}>Room Setpoints</PageTitle>];

    data.forEach((room: any) => {
      arr.push(<Setpoint data={room} key={Math.random()} onClick={() => setDetails(room.room)} close={() => setDetails(false)} />);
    });
    return arr;
  };

  if (!details) {
    return showAllRooms(data);
  } else {
    return showRoomSetpoints();
  }
};

export default SetpointsPage;

const query: string = `
  query GetAllSetpoints {
    response:getAllSetpoints {
      room
      setpoints
    }
  }
`;
