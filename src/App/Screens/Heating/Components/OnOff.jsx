import React from "react";
import { useEffect, useState } from "react";
import AutoOnOff from "../../../Ui Library/Controllers/AutoControl";

const RadiatorFan = () => {
  const [deviceData, setDeviceData] = useState(JSON.parse(localStorage.getItem("Heating Schedule")));
  const [now, setNow] = useState(new Date().getTime());
  // Todo, Add heating for connection
  const [heating, setHeating] = useState(JSON.parse(localStorage.getItem("Heating")));

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(JSON.parse(localStorage.getItem("Heating Schedule")));
      setHeating(JSON.parse(localStorage.getItem("Heating")));
      setNow(new Date().getTime());
    }, 100);

    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <AutoOnOff
      title={"Heating"}
      pos={[85, 25]}
      onAction={() => fetch("api/ci/on")}
      offAction={() => fetch("api/ci/off")}
      autoAction={() => fetch("/api/ci/manual/off")}
      manualAction={() => fetch("/api/ci/manual/on")}
      auto={deviceData.auto}
      state={deviceData.heatingTime > now ? true : false}
      connection={heating.isConnected}
    />
  );
};

export default RadiatorFan;
