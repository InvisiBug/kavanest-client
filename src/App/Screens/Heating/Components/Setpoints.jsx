import React from "react";
import { useEffect, useState } from "react";
import FullDaySetpoints from "../../../Ui Library/FullDaySetpoints";

const Boost = () => {
  const [setpoints, setSetpoints] = useState(JSON.parse(localStorage.getItem("Environmental Data")).setpoints);
  const { kitchen, liamsRoom, livingRoom, ourRoom, study } = setpoints;

  useEffect(() => {
    const timer = setTimeout(() => {
      setSetpoints(JSON.parse(localStorage.getItem("Environmental Data")).setpoints);
    }, 100);
    return () => clearTimeout(timer);
  }, [setpoints]);

  // console.log(setpoints);
  // console.log(kitchen);

  return <FullDaySetpoints data={kitchen} />;
};

export default Boost;
