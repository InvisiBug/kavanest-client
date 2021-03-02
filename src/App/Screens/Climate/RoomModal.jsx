/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";

import Day from "./Charts/Day";
import Week from "./Charts/Week";
import Month from "./Charts/Month";
import Year from "./Charts/Year";
import Timescale from "./Charts/Timescale";
import FullDaySetpoints from "../../Ui Library/FullDaySetpoints";
import Cross from "./Charts/Close.png";
import ModuleHeader from "../../Ui Library/ModuleHeader";
import HeatingSensor from "../../Ui Library/HeatingSensor";
import RadiatorDot from "../../Ui Library/RadiatorDot";
import Offset from "./RoomModal/Offset";

const RoomModal = ({ room, closeModal }) => {
  const [timescale, setTimescale] = useState("day");

  const changeTimescale = (newDay) => {
    setTimescale(newDay);
  };

  return (
    <>
      <div css={modal}>
        <CloseIcon src={Cross} alt="" onClick={closeModal} />

        {/* Room Controls */}
        <div css={controlsContainer}>
          <div css={header}>
            <ModuleHeader>{room}</ModuleHeader>
          </div>

          {room !== "Kitchen" ? (
            <>
              <HeatingSensor datapoint={room} pos={[11.5, 20]} clickable={false} />
              <RadiatorDot datapoint={room} pos={[17.5, 20]} />
              <FullDaySetpoints title={room} pos={[17.5, 50]} upAction={null} downAction={null} />
              <Offset room={room} pos={[23.5, 20]} />
            </>
          ) : (
            <>
              <HeatingSensor datapoint={room} pos={[11.5, 20]} clickable={false} />
              <Offset room={room} pos={[23.5, 20]} />
            </>
          )}
        </div>

        {/* Graphs */}
        <div css={graphContainer}>
          {timescale === "day" ? (
            <Day room={room} closeGraph={null} />
          ) : timescale === "week" ? (
            <Week room={room} closeGraph={null} />
          ) : timescale === "month" ? (
            <Month room={room} closeGraph={null} />
          ) : timescale === "year" ? (
            <Year room={room} closeGraph={null} />
          ) : null}
          <Timescale currentTimeScale={timescale} changeTimeScale={changeTimescale} />
        </div>
      </div>
    </>
  );
};

export default RoomModal;

const header = css`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 14%;
  left: 17.5%;
  color: blue;
`;

const graphContainer = css`
  height: 100%;
  width: 65%;
  /* margin-left: 35%; */
  /* background: red; */

  /* border: 1px solid black; */
  /* background-color: red; */
`;

const controlsContainer = css`
  height: 100%;
  width: 34%;
  /* background-color: green; */
`;

const CloseIcon = styled.img`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 30px;
  width: 30px;
  top: 4%;

  left: 97.6%;
  opacity: 0.95;
  z-index: +1;
`;

const modal = css`
  /* /* background: red; */
  position: absolute;
  transform: translate(-50%, -50%);
  height: 80%;
  width: 80%;
  top: 50%;
  left: 50%;

  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  background: rgba(50, 50, 50, 0.1);
  color: white;
  font-family: "Arial";
  font-size: 15px;
  display: flex;
`;
