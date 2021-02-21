/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

import { onColour } from "../../../Ui Library/Constants";

import Button from "../../../Ui Library/Button";

const Timescale = ({ changeTimeScale, currentTimeScale }) => {
  return (
    <div css={timescaleButtonsContainer}>
      <Button isActive={currentTimeScale === "day"} handleClick={() => changeTimeScale("day")} activeColour={onColour}>
        Day
      </Button>

      <Button isActive={currentTimeScale === "week"} handleClick={() => changeTimeScale("week")} activeColour={onColour}>
        Week
      </Button>

      <Button isActive={currentTimeScale === "month"} handleClick={() => changeTimeScale("month")} activeColour={onColour}>
        Month
      </Button>

      <Button isActive={currentTimeScale === "year"} handleClick={() => changeTimeScale("year")} activeColour={onColour}>
        Year
      </Button>
    </div>
  );
};

export default Timescale;

const timescaleButtonsContainer = css`
  /* border: 1px solid red; */
  margin: 10px 5% 0 5%;
  width: 90%;

  display: flex;
  flex-direction: row;
  justify-content: space-around;

  /* position: absolute;
  transform: translate(-50%, -50%);
  top: 92.5%;
  left: 50%;
  width: 50%; */
`;

{
  /* <Row>
        <Col md={3} style={{ display: "flex", justifyContent: "center" }}>
          <TimeScaleButtons name="Day" isActive={currentTimeScale === "Day" ? true : false} onClick={() => changeTimeScale("Day")} />
          
        </Col>

        <Col md={3} style={{ display: "flex", justifyContent: "center" }}>
          <TimeScaleButtons name="Week" isActive={currentTimeScale === "Week" ? true : false} onClick={() => changeTimeScale("Week")} />
        </Col>

        <Col md={3} style={{ display: "flex", justifyContent: "center" }}>
          <TimeScaleButtons name="Month" isActive={currentTimeScale === "Month" ? true : false} onClick={() => changeTimeScale("Month")} />
        </Col>

        <Col md={3} style={{ display: "flex", justifyContent: "center" }}>
          <TimeScaleButtons name="Year" isActive={currentTimeScale === "Year" ? true : false} onClick={() => changeTimeScale("Year")} />
        </Col>
      </Row> */
}
