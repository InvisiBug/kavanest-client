/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

import Boost from "./Components/Boost";
import ActiveIndicator from "./Components/ActiveIndicator";
import OnOff from "./Components/OnOff";
import Schedule from "./Components/Schedule";
import RadiatorFan from "./Components/RadiatorFan";
import Setpoints from "./Components/Setpoints";
import RoomOverrides from "./Components/RoomOverrides";

const container = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 85%;
  width: 90%;
  max-width: 1500px;
  top: 50%;
  left: 50%;
`;

const Heating = () => {
  return (
    <div css={container}>
      <Boost />
      <ActiveIndicator />
      <OnOff />
      {/* <Schedule /> */}
      <RadiatorFan />
      <Setpoints />
      <RoomOverrides />
    </div>
  );
};

export default Heating;
