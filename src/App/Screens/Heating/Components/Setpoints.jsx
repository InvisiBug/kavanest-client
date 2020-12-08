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

  const up = (time, title) => {
    console.log(`${time} ${title} Up Pressed`);
  };

  const down = (time, title) => {
    console.log(`${time} ${title} Down Pressed`);
  };

  return (
    <>
      <FullDaySetpoints title={"Living Room"} data={livingRoom} pos={[10, 40]} upAction={up} downAction={down} />
      <FullDaySetpoints title={"Kitchen"} data={kitchen} pos={[50, 40]} upAction={up} downAction={down} />
      <FullDaySetpoints title={"Study"} data={study} pos={[90, 40]} upAction={up} downAction={down} />
      <FullDaySetpoints title={"Liams Room"} data={liamsRoom} pos={[30, 85]} upAction={up} downAction={down} />
      <FullDaySetpoints title={"our Room"} data={ourRoom} pos={[70, 85]} upAction={up} downAction={down} />
    </>
  );
};

export default Boost;
