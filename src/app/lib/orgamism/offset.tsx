import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

import { decamelize } from "../../utils";
import { mq, px } from "../atoms";

// TODO add media queries to scale the container

const Offset: React.FC<Props> = ({ data: { room, setpoints } }) => {
  // const setpoints: Array<any> = data.setpoints;

  const [setpointArr, setSetpointArr] = useState<any | null | void>(null);

  useEffect(() => {
    let setpointArray: Array<any> = [];

    for (const time in setpoints) {
      const setpoint = setpoints[time];

      setpointArray.push({ time, setpoint });
    }
    setSetpointArr(setpointArray);
    // return setpointArray;
  }, [setpoints]);

  // const this =generateOffsets();
  if (!setpointArr) return <></>;

  return (
    <>
      <Container>
        <Room>{decamelize(room)}</Room>
        {setpointArr.map(({ time, setpoint }: SetpointData) => {
          return (
            <React.Fragment key={Math.random()}>
              <Time>{time}</Time>
              <SetpointVal>{setpoint}</SetpointVal>
            </React.Fragment>
          );
        })}
      </Container>
    </>
  );
};

export default Offset;
const Container = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  /* background-color: #2c2c2c; */
  background: linear-gradient(90deg, #df2a2468, #9634076a);

  display: flex;
  justify-content: space-around;
  margin: auto;
  margin-top: 20px;
  flex-direction: column;

  ${mq("small")} {
    flex-direction: row;
  }
`;

const Room = styled.h1`
  color: white;
  display: item;
  align-self: center;
`;

const Time = styled.p`
  display: item;
  color: orange;
  align-self: center;
`;

const SetpointVal = styled.p`
  display: item;
  color: green;
  align-self: center;
`;

export interface Props {
  data: {
    room: string;
    setpoints: Array<SetpointData>;
  };
}

export type SetpointData = {
  time: string;
  setpoint: number;
};
