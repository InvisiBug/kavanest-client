import React, { useState } from "react";
import { PageTitle } from "../../lib";
import RoomSetpointSelection from "./components/roomSelector";
import RoomSetpoints from "./components/roomSetpoints";
import { useQuery, gql } from "@apollo/client";

const SetpointsPage: React.FC = () => {
  const { loading, error, data } = useQuery(getValves, { fetchPolicy: "no-cache" });
  const [roomToShow, setRoomToShow] = useState<any>(false);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  const showAllRooms = (rooms: any) => {
    const arr: any = [
      <PageTitle key={Math.random()} desc={"Each room shown here has a valve"}>
        Room Heating Setpoints
      </PageTitle>,
    ];

    rooms.forEach((room: any) => {
      arr.push(<RoomSetpointSelection data={room} key={Math.random()} onClick={() => setRoomToShow(room.room)} close={() => setRoomToShow(false)} />);
    });
    return arr;
  };

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

  console.log(data.getValves);

  data.getValves.forEach((val: any) => {
    console.log(val.room);
  });

  // * not sure about all this stuff
  // * cant seem to return, something to do with the function call
  // console.log(data);

  // return (
  //   <>
  //     <PageTitle key={Math.random()} desc={"Each room shown here has a valve"}>
  //       Room Heating Setpoints
  //     </PageTitle>

  //     {data.getValves.map((val: any) => {
  //       return (
  //         <>
  //           <RoomSetpointSelection data={val} key={Math.random()} onClick={() => setRoomToShow(val.room)} close={() => setRoomToShow(false)} />
  //         </>
  //       );
  //     })}

  //     {/* {Object.keys(data.getValves).map((room: any) => {
  //       const val = data.getValves[room];

  //       return <RoomSetpointSelection data={val} key={Math.random()} onClick={() => setRoomToShow(val.room)} close={() => setRoomToShow(false)} />;
  //     })} */}
  //   </>
  // );

  // const test = () => {};

  if (!roomToShow) {
    return showAllRooms(data.getValves);
  } else {
    return showRoomSetpoints(roomToShow, data.getValves);
  }
};

export default SetpointsPage;

const getValves = gql`
  query {
    getValves {
      room
    }
  }
`;
