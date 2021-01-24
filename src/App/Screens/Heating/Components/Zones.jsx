import React from "react";
import { useEffect, useState } from "react";
import FullDaySetpoints from "../../../Ui Library/FullDaySetpoints";

const Zones = () => {
  const [setpoints, setSetpoints] = useState(JSON.parse(localStorage.getItem("Environmental Data")).setpoints);
  const [auto, setAuto] = useState(JSON.parse(localStorage.getItem("Environmental Data")).heatingZones.isAuto);
  const { kitchen, liamsRoom, livingRoom, ourRoom, study } = setpoints;

  const xpos = 18;

  const rooms = [
    {
      name: "Living Room",
      pos: [xpos, 60],
      data: livingRoom
    },
    // {
    //   name: "Kitchen",
    //   pos: [29, 60],
    //   data: kitchen
    // },
    {
      name: "Liams Room",
      pos: [xpos + 21, 60],
      data: liamsRoom
    },
    {
      name: "Study",
      pos: [xpos + 2 * 21, 60],
      data: study
    },

    {
      name: "Our Room",
      pos: [xpos + 3 * 21, 60],
      data: ourRoom
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setSetpoints(JSON.parse(localStorage.getItem("Environmental Data")).setpoints);
      setAuto(JSON.parse(localStorage.getItem("Environmental Data")).heatingZones.isAuto);
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

export default Zones;
