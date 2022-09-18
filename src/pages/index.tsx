import React, { FC } from "react";
import { Home, Setpoints, Plugs, Dog, Sensors, RGBLights, Computer, Valves, Bed } from "./components";
import { useAppContext } from "src/lib/context";

const Pages: FC = () => {
  const { screen } = useAppContext();

  const renderPages = () => {
    switch (screen) {
      case "home":
        return <Home />;

      case "sensors":
        return <Sensors />;

      case "setpoints":
        return <Setpoints />;

      case "dog":
        return <Dog />;

      case "plugs":
        return <Plugs />;

      case "lights":
        return <RGBLights />;

      case "computer":
        return <Computer />;

      case "valves":
        return <Valves />;

      case "bed":
        return <Bed />;
    }
  };

  return <>{renderPages()}</>;
};

export default Pages;
