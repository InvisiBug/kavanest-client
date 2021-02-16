/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx, css } from "@emotion/core";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import Cross from "./Close.png";
import { camelRoomName } from "../../../Helpers/Functions";
import { apiPost } from "../../../../Helpers/fetch";

const graphModule = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 70%;
  width: 80%;
  top: 50%;
  left: 50%;

  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(50, 50, 50, 0.1);
  color: white;
  font-family: "Arial";
  font-size: 15px;
`;

const humidityTicks = [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
const temperatureTicks = [0, 5, 10, 15, 20, 25, 30];

const Day = ({ room, closeGraph }) => {
  const [data, setData] = useState();

  const fetchData = (room) => {
    apiPost("/api/heatingSensor/historical", {
      timescale: "day",
      room: room,
    }).then((data) => {
      try {
        var newArray = [];

        for (var i = 0; i < data.length; i++) {
          newArray.push({
            hour: data[i].timestamp.Hour,
            temperature: data[i].temperature,
            setpoint: JSON.parse(localStorage.getItem("Environmental Data")).setpoints[camelRoomName(room)][data[i].timestamp.Hour - 1],
            humidity: data[i].humidity,
          });
        }

        setData(newArray);
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => fetchData(room), []); // Prevents repeated requests

  return (
    <div css={graphModule}>
      <img src={Cross} alt="" className="closeIcon" onClick={closeGraph} />
      <p className="temperatureTitle">Temperature (°C)</p>
      {/* <p className="humidityTitle">Humidity (%)</p> */}
      <p className="xAxisTitle">Time (Hour)</p>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
          <CartesianGrid strokeDasharray="2.5" vertical={false} />

          <XAxis tick={{ fill: "white" }} tickSize={0} dataKey="hour" interval={0} stroke="white" />

          <YAxis yAxisId="left" tick={{ fill: "white" }} ticks={temperatureTicks} domain={[0, 25]} stroke="#a19ee8" />
          {/* <YAxis yAxisId="right" tick={{ fill: "white" }} ticks={humidityTicks} domain={[40, 100]} stroke="#82ca9d" orientation="right" /> */}

          <Line yAxisId="left" isAnimationActive={false} type="monotone" dataKey="temperature" stroke="#a19ee8" strokeWidth={3} dot={false} />

          <Line
            yAxisId="left"
            borderDash={[10, 5]}
            isAnimationActive={false}
            type="monotone"
            dataKey="setpoint"
            stroke="#e8bf9e"
            strokeWidth={3}
            strokeDasharray="5 5"
            dot={false}
          />

          {/* <Line yAxisId="right" isAnimationActive={false} type="monotone" dataKey="humidity" stroke="#82ca9d" strokeWidth={3} dot={false} /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Day;
