/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { jsx, css } from "@emotion/core";
import ValueInput from "../../../Ui Library/ValueInput";
import { localStorageParser } from "../../../../Helpers/localStorageDriver";
import { camelRoomName } from "../../../Helpers/Functions";
import { apiPost } from "../../../../Helpers/fetch";

const Offset = ({ room, pos = [0, 0] }) => {
  const [currentOffset, setCurrentOffset] = useState(localStorageParser(`Environmental Data`).offsets[camelRoomName(room)]);
  const [deviceData, setDeviceData] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      var data = localStorageParser(`Environmental Data`).offsets[camelRoomName(room)];
      setDeviceData(data);

      console.log("Value Input", data);
    }, 500);
    return () => clearTimeout(timer);
  }, [deviceData]);

  const keyPressed = (e) => {
    if (e.keyCode === 13) {
      console.log(camelRoomName(room), e.target.value);
      if (e.target.value < 100 && e.target.value > -100) {
        apiPost("/api/ci/offsets", {
          room: camelRoomName(room),
          value: e.target.value,
        });
      }
    }
  };

  return (
    <div
      style={{
        top: `${pos[1]}%`,
        left: `${pos[0]}%`,
      }}
      css={container}
    >
      <ValueInput placeholder={currentOffset} clicked={(e) => keyPressed(e)} />
    </div>
  );
};

const container = css`
  position: absolute;
  transform: translate(-50%, -50%);
`;

export default Offset;
