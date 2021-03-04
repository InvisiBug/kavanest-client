import React from "react";
import { useEffect, useState } from "react";
import OnOffControl from "../../../../Ui Library/Controllers/SimpleControl";
import { apiFetch } from "../../../../../Helpers/fetch";

const Boost = () => {
  const [deviceData, setDeviceData] = useState(JSON.parse(localStorage.getItem("Environmental Data")));
  const [now, setNow] = useState(new Date().getTime());

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(JSON.parse(localStorage.getItem("Environmental Data")));
      setNow(new Date().getTime());
    }, 100);

    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <OnOffControl
      title={"Boost"}
      pos={[55, 11.5]}
      onAction={() => apiFetch("/api/ci/boost/on")}
      offAction={() => apiFetch("/api/ci/boost/off")}
      state={deviceData.heatingTimers.boost > now ? true : false}
      connection={true}
    />
  );
};

export default Boost;
