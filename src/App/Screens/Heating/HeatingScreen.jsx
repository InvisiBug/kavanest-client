/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx, css } from "@emotion/core";

import Boost from "./Components/Boost";
import ActiveIndicator from "./Components/ActiveIndicator";
import Manual from "./Components/Manual";
import Schedule from "./Components/Schedule";
import RadiatorFan from "./Components/RadiatorFan";
import Zones from "./Components/Zones";
import RoomOverrides from "./Components/RoomOverrides";
import Mode from "./Components/Mode";

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
  const [environmentalData, setEnvironmentalData] = useState(JSON.parse(localStorage.getItem("Environmental Data")));

  useEffect(() => {
    const timer = setTimeout(() => {
      setEnvironmentalData(JSON.parse(localStorage.getItem("Environmental Data")));
    }, 100);
    return () => clearTimeout(timer);
  }, [environmentalData]);

  const renderChoice = () => {
    switch (environmentalData.heatingMode) {
      case "zones":
        return <Zones />;
      case "schedule":
        return [<Schedule />, <Boost />];
      case "manual":
        return <Manual />;
      default:
    }
  };

  return (
    <div css={container}>
      <ActiveIndicator />
      {/* <Manual /> */}
      <RadiatorFan />
      <Mode />

      {renderChoice()}
    </div>
  );
};

export default Heating;
