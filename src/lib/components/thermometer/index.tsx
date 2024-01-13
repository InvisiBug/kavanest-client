import React, { useState, useEffect, FC } from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import { useQuery, gql } from "@apollo/client";
import { sketch } from "./sketch";
import styled from "@emotion/styled";
import { Sensor } from "src/lib/gqlTypes";
import { useAppContext } from "src/lib/context";
import { mq, px } from "src/lib/mediaQueries";

const Thermometer: FC<any> = ({ temp, set }) => {
  const { socket } = useAppContext();
  const [currentTemp, setCurrentTemp] = useState<number>(temp);
  const [setpoint, setSetpoint] = useState<number>(set);
  const { height, width } = useWindowDimensions();
  const [sensor, setSensor] = useState<Sensor>({} as Sensor);
  const [count,setCount] = useState(1);

  const { data } = useQuery<GqlResponse>(request, {
    variables: {
      room: "livingRoom",
    },
    fetchPolicy: "no-cache",
    onCompleted() {
      setSensor(data?.sensor || ({} as Sensor));

      socket.on(String(data?.sensor?._id), (payload: Sensor) => {
        setSensor(payload);
      });
    },
  });

  console.log(sensor);
  // useEffect(() => {
  //   // console.log(width <= parseInt(px("large")));
  //   const interval = setInterval(() => setCurrentTemp((currentTemp) => currentTemp + 0.5), 100);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [width]);

  // if (width <= parseInt(String(px("large")))) return <></>;
  if(!sensor) return<></>

  return (
    <ThermometerContainer>
      <h1>{sensor.temperature}</h1>
      <ReactP5Wrapper sketch={sketch} currentTemp={sensor.temperature} target={15} deadzone={2} set={16} />
    </ThermometerContainer>
  );
};

const request = gql`
  query GetTemperature($room: String) {
    sensor: getSensor(room: $room) {
      temperature
      _id
    }
  }
`;

type GqlResponse = {
  sensor: {
    temperature: number;
    _id: string;
  };
};

const ThermometerContainer = styled.div`
  /* display: hidden; */
  /* border-radius: 50%; */
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
