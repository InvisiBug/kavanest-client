import React from "react";
import { useEffect, useState } from "react";
import HeatingMode from "../../../../Ui Library/Controllers/HeatingMode";
import { apiFetch } from "../../../../../Helpers/fetch";

const Mode = () => {
  const [environmentalData, setEnvironmentalData] = useState(JSON.parse(localStorage.getItem("Environmental Data")));

  useEffect(() => {
    const timer = setTimeout(() => {
      setEnvironmentalData(JSON.parse(localStorage.getItem("Environmental Data")));
    }, 100);

    return () => clearTimeout(timer);
  }, [environmentalData]);

  return (
    <HeatingMode
      title="Heating Mode"
      pos={[10, 19.5]}
      zonesAction={() => apiFetch("/api/ci/mode/zones")}
      scheduleAction={() => apiFetch("/api/ci/mode/schedule")}
      manualAction={() => apiFetch("/api/ci/mode/manual")}
      mode={environmentalData.heatingMode}
    />
  );
};

export default Mode;
