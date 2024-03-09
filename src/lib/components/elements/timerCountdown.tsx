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
      {/* <Container isOpen={remainingTime.split(":")[0] && remainingTime.split(":")[1] > 0}> */}
      <Container isOpen={(remainingTime.split(":")[0] && remainingTime.split(":")[1] > 0) || remainingTime === "lol"}>
        <h2>{children}</h2>
        <h1>{remainingTime.split(":")[0] && remainingTime.split(":")[1] > 1 ? remainingTime : remainingTime === "lol" ? "5 eva M9" : "Off"}</h1>
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

  if (hh > 50) return "lol";

  return `${("0" + hh).slice(-2)}:${("0" + mm).slice(-2)}:${("0" + ss).slice(-2)}`;
};

// export const calcTimeDifference = (now: number, timer: number) => {
//   var hours = Math.abs(now - timer) / 36e5;
//   console.log(hours);

//   const difference = timer - now;

//   if (difference < -1) return `${-1}:${difference}`; // Handles the bed being off

//   var msec = difference;

//   var hh = Math.floor(msec / 1000 / 60 / 60);
//   msec -= hh * 1000 * 60 * 60;
//   var mm = Math.floor(msec / 1000 / 60);
//   msec -= mm * 1000 * 60;
//   var ss = Math.floor(msec / 1000);
//   msec -= ss * 1000;

//   return `${("0" + mm).slice(-2)}:${("0" + ss).slice(-2)}`;
// };

// export const calcTimeDifference = (now: number, timer: number) => {
//   // Calculate the difference in milliseconds
//   let difference = Math.abs(now - timer);

//   // Convert the difference to hours and minutes
//   let hours = Math.floor(difference / (1000 * 60 * 60));
//   let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

//   // Format the hours and minutes as strings with leading zeros if necessary
//   let hoursStr = hours.toString().padStart(2, "0");
//   let minutesStr = minutes.toString().padStart(2, "0");

//   // Return the time difference in "hh:mm" format
//   return `${hoursStr}:${minutesStr}`;
// };

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
