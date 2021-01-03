/** @jsx jsx */
// import React from "react";
import { jsx, css } from "@emotion/core";
import Header from "../ModuleHeader";
import Button from "../Button";
import { onColour } from "../Constants";

const HeatingMode = ({
  title = "New Simple Control",
  pos = [50, 50],
  zonesAction,
  scheduleAction,
  manualAction,
  mode = "zones",
  connection = true
}) => {
  const Container = css`
    position: absolute;
    transform: translate(-50%, -50%);
    height: 245px;
    width: 175px;

    top: ${pos[1]}%;
    left: ${pos[0]}%;

    border-radius: 20px;

    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(50, 50, 50, 0.1);

    font-family: Arial;
  `;

  const header = css`
    position: absolute;
    transform: translate(-50%, -50%);
    top: 25px;
    left: 50%;
  `;

  const zonesButton = css`
    position: absolute;
    transform: translate(-50%, -50%);
    top: 75px;
    left: 50%;
  `;

  const scheduleButton = css`
    position: absolute;
    transform: translate(-50%, -50%);
    top: 135px;
    left: 50%;
  `;

  const manualButton = css`
    position: absolute;
    transform: translate(-50%, -50%);
    top: 195px;
    left: 50%;
  `;

  return (
    <div css={Container}>
      <div css={header}>
        <Header connection={connection}>{title}</Header>
      </div>

      <div css={zonesButton}>
        <Button isActive={mode === "zones" ? true : false} handleClick={zonesAction} activeColour={onColour}>
          Zones
        </Button>
      </div>

      <div css={scheduleButton}>
        <Button isActive={mode === "schedule" ? true : false} handleClick={scheduleAction} activeColour={onColour}>
          Schedule
        </Button>
      </div>

      <div css={manualButton}>
        <Button isActive={mode === "manual" ? true : false} handleClick={manualAction} activeColour={onColour}>
          Manual
        </Button>
      </div>
    </div>
  );
};

export default HeatingMode;
