import React from "react";
import { useEffect, useState } from "react";
import AutoOnOff from "../../../Ui Library/Controllers/AutoControl";

const RadiatorFan = () => {
  const [deviceData, setDeviceData] = useState(JSON.parse(localStorage.getItem("Environmental Data")));
  const [now, setNow] = useState(new Date().getTime());
  // Todo, Add heating for connection
  const [heating, setHeating] = useState(JSON.parse(localStorage.getItem("Heating")));

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(JSON.parse(localStorage.getItem("Environmental Data")));
      setHeating(JSON.parse(localStorage.getItem("Heating")));
      setNow(new Date().getTime());
    }, 100);

    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <AutoOnOff
      title={"Climate Control"}
      pos={[65, 10]}
      onAction={() => fetch("api/ci/on")}
      offAction={() => fetch("api/ci/off")}
      autoAction={() => fetch("/api/ci/manual/off")}
      manualAction={() => fetch("/api/ci/manual/on")}
      auto={deviceData.climateControl.isAuto}
      state={deviceData.climateControl.isOn}
      connection={heating.isConnected}
    />
  );
};

export default RadiatorFan;
