import React, { FC, useState } from "react";
import { PageTitle, SelectorContainer } from "../../lib";
import RoomSelector from "./components/selector";
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
        <PageTitle key={Math.random()} desc={heating.connected ? "Each room shown here is on the system" : "Heating isn't connected 💥"}>
          Room Setpoints
        </PageTitle>
      </div>

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
