import React from "react";
import { useEffect, useState } from "react";
import AutoControl from "../../../Ui Library/Controllers/AutoControl";
import { apiFetch } from "../../../../Helpers/fetch";

const rooms = [
  {
    name: "Living Room",
    pos: [8, 90],
    onAction: "",
    offAction: "",
  },
  {
    name: "Kitchen",
    pos: [29, 90],
    onAction: "",
    offAction: "",
  },
  {
    name: "Liams Room",
    pos: [50, 90],
    onAction: "",
    offAction: "",
  },
  {
    name: "Study",
    pos: [71, 90],
    onAction: "",
    offAction: "",
  },

  {
    name: "Our Room",
    pos: [92, 90],
    onAction: "",
    offAction: "",
  },
];

const RoomOverrides = () => {
  return (
    <>
      {rooms.map((room) => (
        <div key={room.name}>
          <AutoControl
            title={room.name}
            pos={room.pos}
            onAction={() => apiFetch(room.onAction)}
            offAction={() => apiFetch()}
            autoAction={() => apiFetch()}
            manualAction={() => apiFetch()}
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
// onAction={() => apiFetch("api/ci/on")}
// offAction={() => apiFetch("api/ci/off")}
// autoAction={() => apiFetch("/api/ci/manual/off")}
// manualAction={() => apiFetch("/api/ci/manual/on")}
// auto={deviceData.auto}
// state={deviceData.heatingTime > now ? true : false}
// connection={heating.isConnected}
