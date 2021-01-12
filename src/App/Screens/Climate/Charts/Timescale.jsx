/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx, css } from "@emotion/core";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// Buttons
import TimeScaleButtons from "../../../Helpers/Button";

const timescaleButtonsContainer = css`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 92.5%;
  left: 50%;
  width: 50%;
`;

const Timescale = ({ changeTimeScale, currentTimeScale }) => {
  return (
    <div css={timescaleButtonsContainer}>
      <Row>
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
      </Row>
    </div>
  );
};

export default Timescale;
