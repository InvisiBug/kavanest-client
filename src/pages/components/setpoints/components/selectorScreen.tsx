import React, { FC, useState } from "react";
import { PageTitle, PageContents } from "src/lib/components";
import RoomSelector from "./selector";
import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { mq, px } from "src/lib/mediaQueries";
import { Plug } from "src/lib/gqlTypes";
import { useNavigate } from "react-router-dom";

const SetpointsSelectorScreen: FC = () => {
  const navigate = useNavigate();

  const { data } = useQuery<QglResponse>(request, { fetchPolicy: "no-cache" });
  console.log(data);
  const { radiators, heating } = data || ({} as QglResponse);

  if (!data) return <></>;

  return (
    <>
      <div>
        <PageTitle key={Math.random()} desc={heating.connected ? "Setpoint control for each room" : "Heating isn't connected 💥"}>
          Room Setpoints
        </PageTitle>
      </div>

      {/* <PageContents> */}
      <SelectorContainer>
        {radiators.length > 0 ? (
          radiators.map((radiator) => {
            const { name } = radiator;

            return <RoomSelector roomName={name} key={Math.random()} onClick={() => navigate(name)} close={() => null} />;
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

type QglResponse = {
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
