import React, { useEffect } from "react";
import { Home, Setpoints, Switches, Dog, Sensors } from "./pages";
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
    }
  };

  return <>{renderScreen()}</>;
};

export default Screens;
