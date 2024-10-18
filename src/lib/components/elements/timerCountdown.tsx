import React, { FC, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { isTimeLeft, calcTimeDifference } from "src/lib/helpers";

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

  const hours = remainingTime.split(":")[0];
  const mins = remainingTime.split(":")[1];
  const secs = remainingTime.split(":")[2];

  const timeLeft = isTimeLeft(hours, mins, secs);

  return (
    <>
      <Container isOpen={timeLeft || remainingTime === "lol"}>
        <h2>{children}</h2>
        <h1>{timeLeft ? remainingTime : remainingTime === "lol" ? "5 eva M9" : "Off"}</h1>
      </Container>
    </>
  );
};

export default TimerCountdown;

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
