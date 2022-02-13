import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import styled from "@emotion/styled";

//! This entire function is a mess, fix sometime
const Countdown: FC<any> = ({ time, update }) => {
  const countdownTime = new Date(time).getTime();
  const now = new Date().getTime();
  const [remainingTime, setRemainingTime] = useState<any>(calcTimeDifference(now - 1000, countdownTime)); // The "- 1000" here makes the update work correctly

  useEffect(() => {
    const timer = setTimeout(() => {
      setRemainingTime(calcTimeDifference(now, countdownTime));
    }, 1000);
    return () => clearTimeout(timer);
  }, [remainingTime]); //eslint-disable-line

  return (
    <>
      <Container>
        <h2>Remaining Time</h2>
        <h1>{remainingTime}</h1>
      </Container>
    </>
  );
};

export const calcTimeDifference = (now: any, mattress: any) => {
  const difference = mattress - now;

  if (difference < -1) return "Off";

  var msec = difference;

  var hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  var mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  var ss = Math.floor(msec / 1000);
  msec -= ss * 1000;

  return `${("0" + mm).slice(-2)}:${("0" + ss).slice(-2)}`;
};

export default Countdown;

const Container = styled.div`
  padding-top: 0;
  text-align: center;
  border-bottom: 1px solid grey;
`;
