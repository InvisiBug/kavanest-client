import React, { FC, useState } from "react";
import { PageTitle, PageContents } from "src/lib/components";
import RoomSelector from "./selector";
import { useQuery, gql } from "@apollo/client";

const SetpointsSelectorScreen: FC<any> = ({ setRoomToShow }) => {
  const { data } = useQuery(getValves, { fetchPolicy: "no-cache" });
  const [count, setCount] = useState<number>(0);
  if (!data) return <></>;

  const heating = data.heating;

  return (
    <>
      <div
        onClick={() => {
          setCount(count + 1);
          console.log(count);
          if (count > 3) {
            localStorage.setItem("admin", "true");
          }
        }}
      >
        <PageTitle key={Math.random()} desc={heating.connected ? "Setpoint control for each room" : "Heating isn't connected 💥"}>
          Room Setpoints
        </PageTitle>
      </div>

      <PageContents>
        {data.getValves.length > 0 ? (
          data.getValves.map((room: any) => {
            return <RoomSelector data={room} key={Math.random()} onClick={() => setRoomToShow(room.room)} close={() => setRoomToShow(false)} />;
          })
        ) : (
          <h1>No valves found</h1>
        )}
      </PageContents>
    </>
  );
};
export default SetpointsSelectorScreen;

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
