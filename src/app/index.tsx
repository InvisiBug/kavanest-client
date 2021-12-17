import React from "react";
import { Home, Setpoints, Switches, Dog, Sensors, RGBLights } from "./pages";
import { useAppContext } from "./utils";

const Screens: React.FC = () => {
  const { screen } = useAppContext();

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return <Home />;

      case "sensors":
        return <Sensors />;

      case "setpoints":
        return <Setpoints />;

      case "dog":
        return <Dog />;

      case "switches":
        return <Switches />;
      case "rgbLights":
        return <RGBLights />;
    }
  };

  return <>{renderScreen()}</>;
};

export default Screens;
