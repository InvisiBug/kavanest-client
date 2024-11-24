import React, { useState, useEffect, FC } from "react";
// import { ReactP5Wrapper } from "react-p5-wrapper";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { sketch } from "./sketch";
import styled from "@emotion/styled";
import { mq, px } from "@/lib/mediaQueries";

const Thermometer: FC<any> = ({ temp = 10, set }) => {
  const [currentTemp, setCurrentTemp] = useState<number>(temp);
  console.log("🚀 ~ currentTemp:", currentTemp);
  const [setpoint, setSetpoint] = useState<number>(set);
  const { height, width } = useWindowDimensions();

  console.log(setpoint);
  useEffect(() => {
    // console.log(width <= parseInt(px("large")));
    const interval = setInterval(() => setCurrentTemp((currentTemp) => currentTemp + 0.5), 100);
    return () => {
      clearInterval(interval);
    };
  }, [width]);

  // if (width <= parseInt(String(px("large")))) return <></>;

  return (
    <>
      <h1>hello</h1>
      <ThermometerContainer>
        <ReactP5Wrapper sketch={sketch} currentTemp={currentTemp} target={15} deadzone={2} set={setpoint} />
      </ThermometerContainer>
    </>
  );
};

const ThermometerContainer = styled.div`
  display: hidden;
  ${mq("large")} {
    /* background-color: white; */
    /* border: 1px solid green; */
    /* width: 50%;
    height: 50%; */
  }
`;

export default Thermometer;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;

  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
