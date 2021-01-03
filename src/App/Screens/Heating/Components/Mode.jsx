import React from "react";
import { useEffect, useState } from "react";
import HeatingMode from "../../../Ui Library/Controllers/HeatingMode";

const Boost = () => {
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
      pos={[10, 10]}
      zonesAction={() => fetch("api/ci/mode/zones")}
      scheduleAction={() => fetch("api/ci/mode/schedule")}
      manualAction={() => fetch("api/ci/mode/manual")}
      mode={environmentalData.heatingMode}
    />
  );
};

export default Boost;
