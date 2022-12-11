import React, { FC, useEffect, useState } from "react";
import styled from "@emotion/styled";

const TimerCountdown: FC<{ time: string }> = ({ time, children }) => {
  const countdownTime = new Date(time).getTime();

  const [now, setNow] = useState(new Date().getTime());
  const [remainingTime, setRemainingTime] = useState<any>(calcTimeDifference(now, countdownTime));

  useEffect(() => {
    setRemainingTime(calcTimeDifference(now, countdownTime));
    const timer = setTimeout(() => {
      setNow(new Date().getTime());
    }, 100);

    return () => clearTimeout(timer);
  }, [remainingTime, now, countdownTime]);

  return (
    <>
      <Container>
        <h2>{children}</h2>
        <h1>{remainingTime.split(":")[0] && remainingTime.split(":")[1] > 1 ? remainingTime : "Off"}</h1>
      </Container>
    </>
  );
};

export default TimerCountdown;

export const calcTimeDifference = (now: number, timer: number) => {
  const difference = timer - now;

  if (difference < -1) return `${-1}:${difference}`; // Handles the bed being off

  var msec = difference;

  var hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  var mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  var ss = Math.floor(msec / 1000);
  msec -= ss * 1000;

  return `${("0" + mm).slice(-2)}:${("0" + ss).slice(-2)}`;
};

const Container = styled.div`
  padding-top: 0;
  text-align: center;
  /* border-bottom: 1px solid grey; */
`;
