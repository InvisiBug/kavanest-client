import React, { FC } from "react";
import { Home, Setpoints, Plugs, Dog, Sensors, RGBLights, Computer, Valves, Bed } from "./components";
import { useAppContext } from "src/lib/context";
import { Routes, Route } from "react-router-dom";

const Pages: FC = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/setpoints" element={<Setpoints />} />
      <Route path="/sensors" element={<Sensors />} />
      <Route path="/lights" element={<RGBLights />} />
      <Route path="/bed" element={<Bed />} />
      <Route path="/computer" element={<Computer />} />
    </Routes>
  );
};

export default Pages;
