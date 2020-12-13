/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx, css } from "@emotion/core";
import RadiatorValves from "../../Ui Library/Diagnostics/RadiatorValves";

const container = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 85%;
  width: 90%;
  max-width: 1500px;
  /* // width: "1200px", */
  left: 50%;
  top: 50%;
  border: 1px solid green;

  /* display: flex; */
`;

const test = css`
  border: 1px solid black;
  color: white;
`;

const Diagnostics = () => {
  const [environmentalData, setEnvironmentalData] = useState(JSON.parse(localStorage.getItem("Environmental Data")));

  useEffect(() => {
    const timer = setTimeout(() => {
      setEnvironmentalData(JSON.parse(localStorage.getItem("Environmental Data")));
    }, 100);
    return () => clearTimeout(timer);
  }, [environmentalData]);

  return (
    <div css={container}>
      <RadiatorValves environmentalData={environmentalData} />
      {/* <div css={test}>
        <h4>Living Room Radiator Valve: {environmentalData.radiatorValves.livingRoom.isOpen ? "Open" : "Closed"}</h4>
        <h4>Kitchen Radiator Valve: {environmentalData.radiatorValves.kitchen.isOpen ? "Open" : "Closed"}</h4>
        <h4>Liams Room Radiator Valve: {environmentalData.radiatorValves.liamsRoom.isOpen ? "Open" : "Closed"}</h4>
        <h4>Study Radiator Valve: {environmentalData.radiatorValves.study.isOpen ? "Open" : "Closed"} </h4>
        <h4>Our Room Radiator Valve: {environmentalData.radiatorValves.ourRoom.isOpen ? "Open" : "Closed"}</h4>
      </div> */}
    </div>
  );
};

export default Diagnostics;
