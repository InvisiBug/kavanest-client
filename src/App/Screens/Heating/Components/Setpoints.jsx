import React from "react";
import { useEffect, useState } from "react";
import FullDaySetpoints from "../../../Ui Library/FullDaySetpoints";

const Setpoints = () => {
  const [setpoints, setSetpoints] = useState(JSON.parse(localStorage.getItem("Environmental Data")).setpoints);
  const { kitchen, liamsRoom, livingRoom, ourRoom, study } = setpoints;

  const rooms = [
    {
      name: "Living Room",
      pos: [8, 50],
      data: livingRoom
    },
    {
      name: "Kitchen",
      pos: [29, 50],
      data: kitchen
    },
    {
      name: "Liams Room",
      pos: [50, 50],
      data: liamsRoom
    },
    {
      name: "Study",
      pos: [71, 50],
      data: study
    },

    {
      name: "Our Room",
      pos: [92, 50],
      data: ourRoom
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setSetpoints(JSON.parse(localStorage.getItem("Environmental Data")).setpoints);
    }, 100);
    return () => clearTimeout(timer);
  }, [setpoints]);

  const up = (time, room) => {
    let newVal = setpoints[room];
    newVal[time] = newVal[time] + 1;

    fetch("/api/ci/setpoints", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        room: room,
        vals: newVal
      })
    });
  };

  const down = (time, room) => {
    let newVal = setpoints[room];
    newVal[time] = newVal[time] - 1;

    fetch("/api/ci/setpoints", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        room: room,
        vals: newVal
      })
    });
  };

  return (
    <>
      {rooms.map(room => (
        <FullDaySetpoints title={room.name} data={room.data} pos={room.pos} upAction={up} downAction={down} key={room.name} />
      ))}
    </>
  );
};

export default Setpoints;

{
  /* <FullDaySetpoints title={"Living Room"} data={livingRoom} pos={[8, 50]} upAction={up} downAction={down} />
<FullDaySetpoints title={"Kitchen"} data={kitchen} pos={[29, 50]} upAction={up} downAction={down} />
<FullDaySetpoints title={"Liams Room"} data={liamsRoom} pos={[50, 50]} upAction={up} downAction={down} />
<FullDaySetpoints title={"Study"} data={study} pos={[71, 50]} upAction={up} downAction={down} />
<FullDaySetpoints title={"Our Room"} data={ourRoom} pos={[92, 50]} upAction={up} downAction={down} /> */
}
