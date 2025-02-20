import { FC } from "react";
import { Home, Setpoints, Plugs, Livingroom, Sensors, RGBLights, Computer, Bedroom, Valves, Bed, Study, Kitchen } from "./components";
import { useAppContext } from "@/lib/context";

const Pages: FC = () => {
  const { screen } = useAppContext();

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
    case "study":
      return <Study />;
    case "bedroom":
      return <Bedroom />;
    case "valves":
      return <Valves />;
    case "livingRoom":
      return <Livingroom />;
    case "kitchen":
      return <Kitchen />;
    default:
      return <Setpoints />;
  }
};

export default Pages;
