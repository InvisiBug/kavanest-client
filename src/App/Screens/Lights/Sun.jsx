import React from "react";
import { useEffect, useState } from "react";
import OnOffControl from "../../Ui Library/Controllers/SimpleControl";
import { apiFetch } from "../../../Helpers/fetch";

const deviceName = "Sun";
const Floodlight = () => {
  const [deviceData, setDeviceData] = useState(JSON.parse(localStorage.getItem(deviceName)));

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(JSON.parse(localStorage.getItem(deviceName)));
    }, 100);
    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <OnOffControl
      title={deviceName}
      pos={[75, 20]}
      onAction={() => apiFetch("/api/Sun/On")}
      offAction={() => apiFetch("/api/Sun/Off")}
      state={deviceData.isOn}
      connection={deviceData.isConnected}
    />
  );
};

export default Floodlight;
