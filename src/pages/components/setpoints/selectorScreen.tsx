import React, { FC } from "react";
import { PageTitle } from "@/lib/components";
import { HeatingRoomSelector } from "@/lib/components";
import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { mq, px } from "@/lib/mediaQueries";
import { Plug } from "@/lib/gqlTypes";
import { useNavigate } from "react-router-dom";

const SetpointsSelectorScreen: FC<any> = ({ setOpenRoom }) => {
  const navigate = useNavigate();

  const { data } = useQuery<QglResponse>(request, { fetchPolicy: "no-cache" });

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

            return <HeatingRoomSelector roomName={name} key={Math.random()} onClick={() => setOpenRoom(name)} />;
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
    display: grid;
    /* grid-template-columns: 1fr 1fr 1fr; */
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 20px;
    /* flex-direction: row;
    flex-wrap: wrap;

    justify-content: space-around; */
    /* background-color: orange; */
    /* max-width: ${px("large")}px; */
    & > *:first-of-type {
      /* border-top: none; */
    }
    & > div {
      // Apply to child divs
      /* flex: 25%; */
      /* padding: 10%; */
      /* margin-bottom: 200px; */
    }
  }
`;
