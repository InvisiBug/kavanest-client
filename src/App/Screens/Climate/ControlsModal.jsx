/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";

import Cross from "./Charts/Close.png";
import Mode from "./ControlsModal/Mode";
import RadiatorFan from "./ControlsModal/RadiatorFan";
import Manual from "./ControlsModal/Manual";
import Schedule from "./ControlsModal/Schedule";
import Boost from "./ControlsModal/Boost";

const ControlsModal = ({ room, closeModal }) => {
  const [environmentalData, setEnvironmentalData] = useState(JSON.parse(localStorage.getItem("Environmental Data")));

  useEffect(() => {
    const timer = setTimeout(() => {
      setEnvironmentalData(JSON.parse(localStorage.getItem("Environmental Data")));
    }, 100);
    return () => clearTimeout(timer);
  }, [environmentalData]);

  const renderMode = () => {
    switch (environmentalData.heatingMode) {
      case "schedule":
        return [<Schedule />, <Boost />];
      case "manual":
        return <Manual />;
      default:
    }
  };

  return (
    <>
      <Container>
        <img src={Cross} alt="" className="closeIcon" onClick={closeModal} />
        <RadiatorFan />
        <Mode />
        {renderMode()}
      </Container>
    </>
  );
};

export default ControlsModal;

const Container = styled.div`
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
