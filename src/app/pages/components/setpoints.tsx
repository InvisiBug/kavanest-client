import React, { useLayoutEffect, useState } from "react";
import { PageTitle } from "../../atoms";
import { Setpoints } from "../../orgamisms";
import { asyncRequest } from "../../utils";
import Switches from "../../templates/switches";

const SetpointsPage: React.FC = () => {
  const [data, setData] = useState<any | null | void>(null);
  const [details, setDetails] = useState<any | null | void>(false);

  useLayoutEffect(() => {
    asyncRequest(query, setData);
  }, []);

  if (!data) return <></>;

  const showDetails = () => {
    for (let rooms in data) {
      if (data[rooms].room === details) {
        return (
          <>
            <Switches close={() => setDetails(false)} name={data[rooms].room} />
          </>
        );
      }
    }
  };

  const showAllRooms = (data: any) => {
    const arr: any = [<PageTitle>Room Setpoints</PageTitle>];

    data.forEach((room: any) => {
      arr.push(
        <Setpoints
          data={room}
          key={Math.random()}
          onClick={() => {
            setDetails(room.room);
          }}
          close={() => setDetails(false)}
        />
      );
    });
    return arr;
  };

  // return <>{details ? showDetails() : showAllRooms(data)}</>;

  if (!details) {
    return showAllRooms(data);
  } else {
    return showDetails();
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
