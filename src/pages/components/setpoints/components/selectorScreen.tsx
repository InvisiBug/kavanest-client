import React, { FC, useState } from "react";
import { PageTitle, PageContents } from "src/lib/components";
import RoomSelector from "./selector";
import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { mq, px } from "src/lib/mediaQueries";
import { Plug } from "src/lib/types";

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
        {data.radiators.length > 0 ? (
          data.radiators.map((radiator) => {
            const { name } = radiator;
            console.log(name);

            return <RoomSelector roomName={name} key={Math.random()} onClick={() => setRoomToShow(name)} close={() => setRoomToShow(false)} />;
          })
        ) : (
          <h1>No controllable rooms found</h1>
        )}
      </SelectorContainer>
      {/* </PageContents> */}
    </>
  );
};
export default SetpointsSelectorScreen;

const request = gql`
  query {
    radiators: getRadiators {
      name
    }
    heating: getPlug(name: "heating") {
      name
      state
      connected
    }
  }
`;

type Data = {
  radiators: [
    {
      name: string;
    }
  ];
  heating: Plug;
};

const SelectorContainer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  & > *:first-of-type {
    border-top: 1px solid grey;
  }

  ${mq("large")} {
    /* border: 1px solid white; */
    flex-direction: row;
    flex-wrap: wrap;

    justify-content: space-around;
    /* background-color: orange; */
    /* max-width: ${px("medium")}px; */
    & > *:first-of-type {
      /* border-top: none; */
    }
  }
`;
