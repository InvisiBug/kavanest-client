/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx, css } from "@emotion/core";
import ArrowDown from "../Ui Library/Icons/ArrowDown.png";
import ArrowUp from "../Ui Library/Icons/ArrowUp.png";
import ModuleHeader from "./ModuleHeader";
import HeatingSensor from "./HeatingSensor";
import RadiatorDot from "./RadiatorDot";

import { camelRoomName } from "../Helpers/Functions";
import { apiPost } from "../../Helpers/fetch";

const FullDaySetpoints = ({ title, pos, upAction, downAction, showGraph }) => {
  const hour = new Date().getHours();

  const [setpoints, setSetpoints] = useState(JSON.parse(localStorage.getItem("Environmental Data")).setpoints);
  const data = setpoints[camelRoomName(title)];

  useEffect(() => {
    const timer = setTimeout(() => {
      setSetpoints(JSON.parse(localStorage.getItem("Environmental Data")).setpoints);
      // setAuto(JSON.parse(localStorage.getItem("Environmental Data")).heatingZones.isAuto);
    }, 100);
    return () => clearTimeout(timer);
  }, [setpoints]);

  const up = (time, room) => {
    let newVal = setpoints[room];
    newVal[time] = newVal[time] + 1;

    apiPost("/api/ci/setpoints", {
      room: room,
      vals: newVal,
    });
  };

  const down = (time, room) => {
    let newVal = setpoints[room];
    newVal[time] = newVal[time] - 1;

    apiPost("/api/ci/setpoints", {
      room: room,
      vals: newVal,
    });
  };

  return (
    <div
      css={[container]}
      style={{
        top: `${pos[1]}%`,
        left: `${pos[0]}%`,
      }}
    >
      {/* <div css={header}>
        <ModuleHeader>{title}</ModuleHeader>
      </div>
      <HeatingSensor datapoint={title} pos={[40, 15]} showGraph={showGraph} />
      <RadiatorDot datapoint={title} pos={[70, 14.5]} /> */}
      <div css={tableBox}>
        {data.map((setpoint, index) => (
          <div css={setpointTime} key={index}>
            <div css={setpointRow}>
              <div css={time}>{`${index}:00`}</div>
              <div>
                <img css={arrow} src={ArrowDown} alt="" onClick={() => down(index, camelRoomName(title))} />
              </div>
              <div style={{ color: index === hour ? "lime" : "" }}>{setpoint}</div>
              <div>
                <img css={arrow} src={ArrowUp} alt="" onClick={() => up(index, camelRoomName(title))} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullDaySetpoints;

//

const container = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 400px;
  width: 20%;

  top: 70%;
  left: 50%;

  /* border: none; */
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  background: rgba(50, 50, 50, 0.1);

  font-family: Arial;

  color: #ffffff;
`;

const header = css`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 7%;
  left: 50%;
  color: blue;
`;

const tableBox = css`
  position: absolute;
  transform: translateX(-50%);
  top: 2%;
  left: 50%;

  width: 100%;
  height: 400px;

  display: flex;

  flex-direction: column;
  flex-wrap: wrap;
`;

const setpointTime = css`
  margin: 0 10px 0 10px;
  height: 33px;
`;

const setpointRow = css`
  display: flex;
  justify-content: space-around;
`;

const time = css`
  opacity: 0.7;
`;

const arrow = css`
  height: 20px;
  opacity: 0.5;
  :active {
    opacity: 1;
  }
`;
