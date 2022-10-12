import React, { FC, useState } from "react";
import { PageTitle, PageContents } from "src/lib/components";
import RoomSelector from "./selector";
import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { mq, px } from "src/lib/mediaQueries";

const SetpointsSelectorScreen: FC<any> = ({ setRoomToShow }) => {
  const { data } = useQuery<Data>(request, { fetchPolicy: "no-cache" });
  const [count, setCount] = useState<number>(0);
  if (!data) return <></>;

  const heating = data.heating;

  return (
    <>
      {/* Used to set admin rights (Currently not used) */}
      <div
        onClick={() => {
          setCount(count + 1);
          if (count > 3) {
            localStorage.setItem("admin", "true");
          }
        }}
      >
        <PageTitle key={Math.random()} desc={heating.connected ? "Setpoint control for each room" : "Heating isn't connected 💥"}>
          Room Setpoints
        </PageTitle>
      </div>

      {/* <PageContents> */}
      <SelectorContainer>
        {data.valves.length > 0 ? (
          data.valves.map((room) => {
            const { roomName } = room;

            return (
              <RoomSelector roomName={roomName} key={Math.random()} onClick={() => setRoomToShow(roomName)} close={() => setRoomToShow(false)} />
            );
          })
        ) : (
          <h1>No valves found</h1>
        )}
      </SelectorContainer>
      {/* </PageContents> */}
    </>
  );
};
export default SetpointsSelectorScreen;

const request = gql`
  query {
    valves: getValves {
      roomName: room
    }
    heating: getPlug(name: "heating") {
      name
      state
      connected
    }
  }
`;

type Data = {
  valves: [
    {
      roomName: string;
    }
  ];
  heating: {
    name: string;
    state: boolean;
    connected: boolean;
  };
};

const SelectorContainer = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  & > *:first-of-type {
    border-top: 1px solid grey;
  }

  ${mq("large")} {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-around;
    /* background-color: orange; */
    /* max-width: ${px("medium")}px; */
    & > *:first-of-type {
      /* border-top: none; */
    }
  }
`;
