import React from "react";
import { useEffect, useState } from "react";
// import FullDaySetpoints from "../../../Ui Library/FullDaySetpoints";
import AutoControl from "../../../Ui Library/Controllers/AutoControl";

const rooms = [
  {
    name: "Living Room",
    pos: [8, 90]
  },
  {
    name: "Kitchen",
    pos: [29, 90]
  },
  {
    name: "Liams Room",
    pos: [50, 90]
  },
  {
    name: "Study",
    pos: [71, 90]
  },

  {
    name: "Our Room",
    pos: [92, 90]
  }
];

const RoomOverrides = () => {
  return (
    <>
      {rooms.map(room => (
        <div key={room.name}>
          <AutoControl
            title={room.name}
            pos={room.pos}
            onAction={() => fetch()}
            offAction={() => fetch()}
            autoAction={() => fetch()}
            manualAction={() => fetch()}
            auto={true}
            state={true}
            connection={true}
          />
        </div>
      ))}
    </>
  );
};

export default RoomOverrides;

// title={"Heating"}
// pos={[85, 10]}
// onAction={() => fetch("api/ci/on")}
// offAction={() => fetch("api/ci/off")}
// autoAction={() => fetch("/api/ci/manual/off")}
// manualAction={() => fetch("/api/ci/manual/on")}
// auto={deviceData.auto}
// state={deviceData.heatingTime > now ? true : false}
// connection={heating.isConnected}
