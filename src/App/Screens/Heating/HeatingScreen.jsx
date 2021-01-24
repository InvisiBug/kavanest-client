/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx, css } from "@emotion/core";
import { Boost, ActiveIndicator, Manual, Schedule, RadiatorFan, Zones, Mode, RoomOverrides } from "./Components/Index";

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

  const renderMode = () => {
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

      {renderMode()}
    </div>
  );
};

export default Heating;
