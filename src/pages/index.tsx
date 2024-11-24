import { FC } from "react";
import { Home, Setpoints, Plugs, Sensors, RGBLights, Computer, Valves, Bed } from "./components";
import { useAppContext } from "@/lib/context";

const Pages: FC = () => {
  const { screen } = useAppContext();

  console.log(screen);

  switch (screen) {
    case "setpoints":
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
};

export default Pages;
