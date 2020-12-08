/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx, css } from "@emotion/core";
import ArrowDown from "../Ui Library/Icons/ArrowDown.png";
import ArrowUp from "../Ui Library/Icons/ArrowUp.png";
import ModuleHeader from "../Ui Library/ModuleHeader";

import { camelRoomName } from "../Helpers/Functions";

const container = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 450px;
  width: 20%;

  top: 70%;
  left: 50%;

  /* border: none; */
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  background: rgba(50, 50, 50, 0.1);

  font-family: Arial;

  color: white;
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
  transform: translate(-50%, -50%);
  top: 57%;
  left: 50%;

  width: 100%;
  height: 90%;

  /* border: 1px solid red; */

  display: flex;
  /* justify-content: space-around; */
  flex-direction: column;
  flex-wrap: wrap;
`;

const setpointTime = css`
  /* width: 50%; */
  margin: 0 10px 0 10px;
  /* border: 1px solid black; */
  /* align-items:center */
  height: 33px;
`;

const setpointRow = css`
  /* border: 1px solid green; */
  /* height: 10%; */

  display: flex;
  justify-content: space-around;
`;

const arrow = css`
  height: 20px;
`;
const FullDaySetpoints = ({ data, title, pos, upAction, downAction }) => {
  return (
    <div
      css={container}
      style={{
        top: `${pos[1]}%`,
        left: `${pos[0]}%`
      }}
    >
      <div css={header}>
        <ModuleHeader>{title}</ModuleHeader>
      </div>
      <div css={tableBox}>
        {data.map((setpoint, index) => (
          <div css={setpointTime} key={index}>
            <div css={setpointRow}>
              <div>{`${index}:00`}</div>

              <div>
                <img css={arrow} src={ArrowDown} alt="" onClick={() => downAction(index, camelRoomName(title))} />
              </div>

              <div>{setpoint}</div>

              <div>
                <img css={arrow} src={ArrowUp} alt="" onClick={() => upAction(index, camelRoomName(title))} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullDaySetpoints;
