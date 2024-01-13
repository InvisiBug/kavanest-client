import React, { useState } from "react";
import { PageTitle, PageContents,Thermometer } from "src/lib/components";
import { useQuery, gql, useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { mq, px } from "src/lib/mediaQueries";
import { Plug, RGBLight } from "src/lib/gqlTypes";

const RoomTemp: React.FC<any> = () => {
  return (
    <>
      <PageTitle desc={"A test or something, i dunno"}>Lights</PageTitle>
      <PageContents>hello</PageContents>
      <Thermometer temp={15} set={18} />
    </>
  );
};

export default RoomTemp;
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

const getLights = gql`
  query ($name1: String, $name2: String, $name3: String, $name4: String, $name5: String) {
    lights: getRGBLights {
      name
      red
      green
      blue
      mode
      connected
      _id
    }
    floodlight: getPlug(name: $name1) {
      name
      state
      connected
      _id
    }
    eggChair: getPlug(name: $name2) {
      name
      state
      connected
      _id
    }
    sun: getPlug(name: $name3) {
      name
      state
      connected
      _id
    }
    lamp: getPlug(name: $name4) {
      name
      state
      connected
      _id
    }
    livingRoomLamp: getPlug(name: $name5) {
      name
      state
      connected
      _id
    }
  }
`;
