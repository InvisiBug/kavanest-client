/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx, css } from "@emotion/core";
import HeatingSensor from "../../Ui Library/HeatingSensor";
import FloorPlanPicture from "./Floor Plan.png";
import RadiatorDot from "../../Ui Library/RadiatorDot";

const floorPlanPictureContainer = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 700px;
  width: 1100px;
  top: 50%;
  left: 50%;

  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  background: rgba(50, 50, 50, 0.1);
  color: white;
  font-family: "Arial";
  font-size: 25px;
`;

const floorPlanPicture = css`
  position: absolute;
  transform: translate(-50%, -50%);
  filter: invert(100%);
  top: 50%;
  left: 50%;
`;

const blur = css`
  filter: blur(20px);
`;

const rooms = [
  {
    name: "Living Room",
    pos: [20.5, 72],
    radiatorPos: [21, 62]
  },
  {
    name: "Kitchen",
    pos: [19, 36]
    // radiatorPos: [21, 26]
  },
  {
    name: "Study",
    pos: [49.5, 36],
    radiatorPos: [48, 41.5]
  },
  {
    name: "Liams Room",
    pos: [51, 72],
    radiatorPos: [50, 62]
  },
  {
    name: "Our Room",
    pos: [86, 55],
    radiatorPos: [85, 40]
  }
  // {
  // name: "Outside",
  // pos: [10, 86]
  // radiatorPos: [50, 50]
  // }
];

const FirstFloor = ({ blurred, showGraph }) => {
  return (
    <div css={[floorPlanPictureContainer, blurred ? blur : null]}>
      <img src={FloorPlanPicture} alt="floorplanPic" css={floorPlanPicture} />

      {rooms.map(room => (
        <div key={room.name}>
          <HeatingSensor datapoint={room.name} pos={room.pos} showGraph={() => showGraph(room.name)} />
          {room.radiatorPos ? <RadiatorDot datapoint={room.name} pos={room.radiatorPos} /> : null}
        </div>
      ))}
    </div>
  );
};

export default FirstFloor;
