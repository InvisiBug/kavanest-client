/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React, { useState, useEffect } from "react";

import Day from "./Charts/Day";
import Week from "./Charts/Week";
import Month from "./Charts/Month";
import Year from "./Charts/Year";
import Timescale from "./Charts/Timescale";
import FullDaySetpoints from "../../Ui Library/FullDaySetpoints";
import Cross from "./Charts/Close.png";

const GraphContainer = ({ room, closeModal }) => {
  const [timescale, setTimescale] = useState("day");

  const changeTimescale = (newDay) => {
    setTimescale(newDay);
  };

  console.log(room);

  return (
    <>
      <div css={modal}>
        <img src={Cross} alt="" className="closeIcon" onClick={closeModal} />
        <div css={controlsContainer}>
          {room !== "Kitchen" ? <FullDaySetpoints title={room} pos={[17.5, 50]} upAction={null} downAction={null} /> : null}
        </div>
        <div css={container}>
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

export default GraphContainer;

const container = css`
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
