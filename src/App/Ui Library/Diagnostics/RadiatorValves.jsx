/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx, css } from "@emotion/core";
import ModuleHeader from "../ModuleHeader";

const RadiatorValves = ({ environmentalData }) => {
  const container = css`
    position: absolute;
    transform: translate(-50%, -50%);
    height: 200px;
    width: 300px;

    top: 50%;
    left: 50%;

    border: none;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    background: rgba(50, 50, 50, 0.1);

    font-family: Arial;
  `;

  const header = css`
    position: absolute;
    transform: translate(-50%, -50%);
    top: 15%;
    left: 50%;
    color: blue;
  `;

  const table = css`
    position: absolute;
    transform: translate(-50%, -50%);
    height: 40%;
    width: 90%;

    top: 60%;
    left: 50%;

    color: white;
  `;

  const row = css`
    text-align: center;
  `;

  return (
    <div css={container}>
      <div css={header}>
        <ModuleHeader>Radiator Valves</ModuleHeader>
      </div>

      <table css={table}>
        <tbody>
          <tr css={row}>
            <td>Living Room</td>
            <td>{environmentalData.radiatorValves.livingRoom.isOpen ? "Open" : "Closed"}</td>
          </tr>
          <tr css={row}>
            <td>Liam's Room</td>
            <td>{environmentalData.radiatorValves.liamsRoom.isOpen ? "Open" : "Closed"}</td>
          </tr>
          <tr css={row}>
            <td>Study</td>
            <td>{environmentalData.radiatorValves.study.isOpen ? "Open" : "Closed"}</td>
          </tr>
          <tr css={row}>
            <td>Our Room</td>
            <td>{environmentalData.radiatorValves.ourRoom.isOpen ? "Open" : "Closed"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RadiatorValves;
