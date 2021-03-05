/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";

import { Mode, RadiatorFan, Manual, Schedule, Boost } from "./Components";
import Cross from "../Charts/Close.png";

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
        <CloseIcon src={Cross} alt="" onClick={closeModal} />
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
