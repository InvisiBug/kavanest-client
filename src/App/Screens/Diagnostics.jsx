/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx, css } from "@emotion/core";

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
      <table>
        <thead>
          <tr>
            <th colspan="2">Radiator Valves</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Living Room</td>
            <td>{environmentalData.radiatorValves.livingRoom.isOpen ? "Open" : "Closed"}</td>
          </tr>
          <tr>
            <td>Kitchen</td>
            <td>{environmentalData.radiatorValves.kitchen.isOpen ? "Open" : "Closed"}</td>
          </tr>
          <tr>
            <td>Liam's Room</td>
            <td>{environmentalData.radiatorValves.liamsRoom.isOpen ? "Open" : "Closed"}</td>
          </tr>
          <tr>
            <td>Study</td>
            <td>{environmentalData.radiatorValves.study.isOpen ? "Open" : "Closed"}</td>
          </tr>
          <tr>
            <td>Our Room</td>
            <td>{environmentalData.radiatorValves.ourRoom.isOpen ? "Open" : "Closed"}</td>
          </tr>
        </tbody>
      </table>

      <div css={test}>
        <h4>Living Room Radiator Valve: {environmentalData.radiatorValves.livingRoom.isOpen ? "Open" : "Closed"}</h4>
        <h4>Kitchen Radiator Valve: {environmentalData.radiatorValves.kitchen.isOpen ? "Open" : "Closed"}</h4>
        <h4>Liams Room Radiator Valve: {environmentalData.radiatorValves.liamsRoom.isOpen ? "Open" : "Closed"}</h4>
        <h4>Study Radiator Valve: {environmentalData.radiatorValves.study.isOpen ? "Open" : "Closed"} </h4>
        <h4>Our Room Radiator Valve: {environmentalData.radiatorValves.ourRoom.isOpen ? "Open" : "Closed"}</h4>
      </div>
    </div>
  );
};

export default Diagnostics;
