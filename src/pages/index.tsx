import { Routes, Route, Navigate } from "react-router-dom";
import React, { FC } from "react";
import { Home, Setpoints, Plugs, Sensors, RGBLights, Computer, Valves, Bed } from "./components";
import { useAppContext } from "@/lib/context";

const Pages: FC = () => {
  const { screen, setScreen } = useAppContext();

  console.log(screen);

  switch (screen) {
    case "setpoints":
      console.log("ehsadljk");
      return <Setpoints />;
    case "sensors":
      return <Sensors />;
    case "lights":
      return <RGBLights />;
    case "bed":
      return <Bed />;
    case "computer":
      return <Computer />;
    case "valves":
      return <Valves />;
    default:
      return <Setpoints />;
  }

  // return (
  //   <Routes>
  //     <Route index element={<Navigate to="/setpoints" replace />} />
  //     <Route path="*" element={renderComponent()} />
  //     <Route path="/setpoints" element={<Setpoints />} />
  //     <Route path="/sensors" element={<Sensors />} />
  //     <Route path="/lights" element={<RGBLights />} />
  //     <Route path="/bed" element={<Bed />} />
  //     <Route path="/computer" element={<Computer />} />
  //     <Route path="/valves" element={<Valves />} />
  //   </Routes>
  // );
};

export default Pages;
