import React from "react";
import { useEffect, useState } from "react";
import AutoOnOff from "../../../Ui Library/Controllers/AutoControl";
import { apiFetch } from "../../../../Helpers/fetch";

const RadiatorFan = () => {
  const [deviceData, setDeviceData] = useState(JSON.parse(localStorage.getItem("Radiator Fan")));

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(JSON.parse(localStorage.getItem("Radiator Fan")));
    }, 100);
    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <AutoOnOff
      title={"Radiator Fan"}
      pos={[71, 10]}
      onAction={() => apiFetch("/api/RadiatorFan/On")}
      offAction={() => apiFetch("/api/RadiatorFan/Off")}
      autoAction={() => apiFetch("/api/RadiatorFanAutomatic/On")}
      manualAction={() => apiFetch("/api/RadiatorFanAutomatic/off")}
      auto={deviceData.isAutomatic}
      state={deviceData.isOn}
      connection={deviceData.isConnected}
    />
  );
};

export default RadiatorFan;
