import React, { useEffect } from "react";
import { Home, Setpoints, Switches, Sensors } from "./pages";
import { useAppContext } from "./utils";

const Screens: React.FC = () => {
  const { screen } = useAppContext();

  // useEffect(() => {
  // console.log(screen);
  // }, [screen]);

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return <Home />;

      case "sensors":
        return <Sensors />;

      case "setpoints":
        return <Setpoints />;

      case "switches":
        return <Switches />;
    }
  };

  return <>{renderScreen()}</>;
};

export default Screens;
