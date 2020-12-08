/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx, css } from "@emotion/core";

const FullDaySetpoints = ({ data }) => {
  const container = css`
    position: absolute;
    transform: translate(-50%, -50%);
    height: 200px;
    width: 300px;

    top: 70%;
    left: 50%;

    border: none;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    background: rgba(50, 50, 50, 0.1);

    font-family: Arial;

    color: white;
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

  // console.log(typeof data);
  return (
    <div css={container}>
      {/* {data.map((des, index) => (
        <p key={des}>{`${des} ${index}`}</p>
      ))} */}

      <table css={table}>
        <tbody>
          {data.map((setpoint, index) => (
            // <p key={des}>{`${des} ${index}`}</p>
            <tr css={row}>
              <td>{`${index}:00`}</td>
              <td>^</td>
              <td>{setpoint}</td>
              <td>v</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FullDaySetpoints;
