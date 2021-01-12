// Components
import React, { useState, useEffect } from "react";
import Day from "./Charts/Day";
import Week from "./Charts/Week";
import Month from "./Charts/Month";
import Year from "./Charts/Year";

import TimescaleSelection from "./Charts/Timescale";
import Rooms from "./Rooms.jsx";

const Climate = () => {
  const [graphs, setGraphs] = useState(false);
  const [timescale, setTimescale] = useState(JSON.parse(localStorage.getItem("Timescale")));
  const [room, setRoom] = useState("kitchen");
  const [blurred, setBlurred] = useState(false);

  const showGraph = room => {
    setBlurred(true);
    setGraphs(true);
    setRoom(room);
  };

  const hideGraph = () => {
    setGraphs(false);
    setBlurred(false);
  };

  return (
    <div>
      <Rooms blurred={blurred} showGraph={showGraph} />

      {graphs ? (
        timescale === "Day" ? (
          <Day room={room} closeGraph={() => hideGraph()} />
        ) : timescale === "Week" ? (
          <Week room={room} closeGraph={setGraphs(false)} />
        ) : timescale === "Month" ? (
          <Month room={room} closeGraph={setGraphs(false)} />
        ) : timescale === "Year" ? (
          <Year room={room} closeGraph={setGraphs(false)} />
        ) : null
      ) : null}

      {/* {graphs ? <TimescaleSelection changeTimeScale={this.changeTimeScale} currentTimeScale={timescale} /> : null} */}
      {/* {ourRoomGraphs ? <SensorInfo room={room} /> : null} */}
    </div>
  );
};

export default Climate;
