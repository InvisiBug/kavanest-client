import React from "react";
import { useEffect, useState } from "react";
import FullDaySetpoints from "../../../Ui Library/FullDaySetpoints";

const Zones = () => {
  const [setpoints, setSetpoints] = useState(JSON.parse(localStorage.getItem("Environmental Data")).setpoints);
  const [auto, setAuto] = useState(JSON.parse(localStorage.getItem("Environmental Data")).heatingZones.isAuto);
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
        <FullDaySetpoints
          myStyle={auto ? { opacity: 1 } : { opacity: 0.5 }}
          title={room.name}
          data={room.data}
          pos={room.pos}
          upAction={up}
          downAction={down}
          key={room.name}
        />
      ))}
    </>
  );
};

export default Zones;
