/** @jsx jsx */
import React from "react";
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

  display: flex;
`;

const test = css`
  border: 1px solid black;
  color: white;
`;

class Computer extends React.Component {
  render() {
    return (
      <div css={container}>
        <div css={test}>
          <h1>Plug</h1>
        </div>
      </div>
    );
  }
}

export default Computer;
