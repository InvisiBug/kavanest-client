import React, { FC } from "react";
import { Home, Setpoints, Plugs, Sensors, RGBLights, Computer, Valves, Bed, Thermometer } from "./components";
import { Routes, Route, Navigate } from "react-router-dom";

const Pages: FC = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="/setpoints" replace />} />
      <Route path="*" element={<Setpoints />} />

      <Route path="/setpoints" element={<Setpoints />} />
      <Route path="/thermometer" element={<Thermometer />} />
      <Route path="/sensors" element={<Sensors />} />
      <Route path="/lights" element={<RGBLights />} />
      <Route path="/bed" element={<Bed />} />
      <Route path="/computer" element={<Computer />} />
      <Route path="/valves" element={<Valves />} />
    </Routes>
  );
};

export default Pages;
