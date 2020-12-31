import React from "react";
import { useEffect, useState } from "react";
import AutoControl from "../../../Ui Library/Controllers/AutoControl";

const RadiatorFan = () => {
  const [deviceData, setDeviceData] = useState(JSON.parse(localStorage.getItem("Environmental Data")));
  const [heating, setHeating] = useState(JSON.parse(localStorage.getItem("Heating")));

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(JSON.parse(localStorage.getItem("Environmental Data")));
      setHeating(JSON.parse(localStorage.getItem("Heating")));
    }, 100);

    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <AutoControl
      title={"Heating"}
      pos={[65, 10]}
      onAction={() => fetch("api/ci/on")}
      offAction={() => fetch("api/ci/off")}
      autoAction={() => fetch("/api/ci/auto")}
      manualAction={() => fetch("/api/ci/manual")}
      auto={deviceData.heatingMode === "zones" ? (deviceData.climateControl.isAuto ? true : false) : deviceData.heatingSchedule.auto ? true : false}
      state={
        deviceData.heatingMode === "zones"
          ? deviceData.heatingSchedule.heatingTime > new Date()
            ? true
            : false
          : deviceData.heatingSchedule.heatingTime > new Date()
          ? true
          : false
      }
      connection={heating.isConnected}
    />
  );
};

export default RadiatorFan;
