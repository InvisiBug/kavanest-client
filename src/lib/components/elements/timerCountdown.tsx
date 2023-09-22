import React, { FC, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

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

  // if (remainingTime.split(":")[0] && remainingTime.split(":")[1] < 0) return null;

  return (
    <>
      <Container isOpen={remainingTime.split(":")[0] && remainingTime.split(":")[1] > 0}>
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

const slide = keyframes`
  from {
    transform: translateY(0%);
  }

  to {
    transform: translateY(100%);
  }
`;

const Container = styled.div`
  padding-top: 0;
  text-align: center;
  display: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? "block" : "none")};
  /* transform: translateY(-100%); */
  /* transform: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? "none" : "none")}; */
  /* animation: ${slide} 2s; */

  /* transition: transform 2s;

  @keyframes transform {
    from {
      transform: translateY(0%);
    }

    to {
      transform: translateY(100%);
    }
  } */
`;
