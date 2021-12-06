import React, { useEffect } from "react";
import { Home, Setpoints, Switches } from "./components";
import { useAppContext } from "../../utils";

const Screens: React.FC = () => {
  const { screen } = useAppContext();

  // useEffect(() => {
  // console.log(screen);
  // }, [screen]);

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return <Home />;

      case "setpoints":
        return <Setpoints />;

      case "switches":
        return <Switches />;
    }
  };

  return <>{renderScreen()}</>;
};

export default Screens;
