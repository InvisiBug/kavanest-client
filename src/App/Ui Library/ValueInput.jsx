/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { jsx, css } from "@emotion/core";
import { localStorageParser } from "../../Helpers/localStorageDriver";
import { camelRoomName } from "../../Helpers/Functions";

const keyPressed = (e) => {
  console.log(e.target.value);
  if (e.keyCode === 13) {
    console.log(e.target.value);
  }
};

const ValueInput = ({ placeholder, clicked }) => {
  return (
    <>
      <div css={container}>
        <input css={newStyle} placeholder={placeholder} input={"text"} onKeyDown={clicked} />
      </div>
    </>
  );
};

export default ValueInput;

const container = css`
  height: 45px;
  width: 110px;

  border-radius: 20px;

  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(50, 50, 50, 0.2);
  font-family: Arial;
  font-size: 15px;

  /* user-select: none; */

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

let newStyle = css`
  width: 135px;

  background: 0, 0, 0, 0;
  color: white;
  border: none;
  width: 50px;
  text-align: center;
  outline: none;

  font-size: 15px;

  ::placeholder {
    color: white;
  }
`;
