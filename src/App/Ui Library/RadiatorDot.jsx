/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx, css } from "@emotion/core";
import { onColour, offColour } from "./Constants";
import { localStorageParser } from "../../Helpers/localStorageDriver";
import { camelRoomName } from "../Helpers/Functions";

// const floorPlanPictureContainer = css`
//   position: absolute;
//   transform: translate(-50%, -50%);
//   height: 700px;
//   width: 1100px;
//   top: 50%;
//   left: 50%;

//   border: 1px solid rgba(255, 255, 255, 0.2);
//   border-radius: 20px;
//   background: rgba(50, 50, 50, 0.1);
//   color: white;
//   font-family: "Arial";
//   font-size: 25px;
// `;

// const floorPlanPicture = css`
//   position: absolute;
//   transform: translate(-50%, -50%);
//   filter: invert(100%);
//   top: 50%;
//   left: 50%;
// `;
const baseStyle = css`
  position: absolute;
  transform: translate(-50%, -50%);

  width: 20px;
  height: 20px;

  /* top: 30%;
  left: 25%; */

  background: green;
  border: 1px solid;

  border-radius: 20px;
`;

let activeStyles = css`
  background-color: ${onColour};
  border: ${onColour};
`;

let inactiveStyles = css`
  background-color: ${offColour};
  border: ${offColour};
`;

let disconnected = css`
  background-color: #7a7a7a;
  border: #7a7a7a;
`;

// const datapoint = "Our Room";
const RadiatorDot = ({ pos, datapoint }) => {
  const [deviceData, setDeviceData] = useState(localStorageParser(`Environmental Data`).radiatorValves[camelRoomName(datapoint)]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(localStorageParser(`Environmental Data`).radiatorValves[camelRoomName(datapoint)]);
    }, 100);
    return () => clearTimeout(timer);
  }, [deviceData]);

  // console.log(deviceData);
  return (
    <div
      css={[baseStyle, deviceData.isOpen ? activeStyles : inactiveStyles, deviceData.isConnected ? null : disconnected]}
      style={{
        top: `${pos[1]}%`,
        left: `${pos[0]}%`
      }}
    />
  );
};

export default RadiatorDot;
