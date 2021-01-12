import React from "react";
import { useEffect, useState } from "react";
import AutoControl from "../../../Ui Library/Controllers/AutoControl";
import SimpleControl from "../../../Ui Library/Controllers/SimpleControl";

const RadiatorFan = () => {
  const [deviceData, setDeviceData] = useState(JSON.parse(localStorage.getItem("Environmental Data")));

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(JSON.parse(localStorage.getItem("Environmental Data")));
    }, 100);

    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <SimpleControl
      title={"Manual Control"}
      pos={[80, 10]}
      connection={true}
      onAction={() => fetch("api/ci/on")}
      offAction={() => fetch("api/ci/off")}
      state={deviceData.heatingManual.heatingTime > new Date()}
    />
  );
};

export default RadiatorFan;
