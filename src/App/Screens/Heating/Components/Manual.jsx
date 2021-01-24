import React from "react";
import { useEffect, useState } from "react";
import SimpleControl from "../../../Ui Library/Controllers/SimpleControl";
import ValveControl from "../../../Ui Library/Controllers/ValveControl";

const RadiatorFan = () => {
  const x = 50;
  const y = 30;
  const [deviceData, setDeviceData] = useState(JSON.parse(localStorage.getItem("Environmental Data")));

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(JSON.parse(localStorage.getItem("Environmental Data")));
      console.log(deviceData.radiatorValves.ourRoom.isOpen);
    }, 100);

    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <>
      <SimpleControl
        title={"Manual Control"}
        pos={[80, 10]}
        connection={true}
        onAction={() => fetch("api/ci/on")}
        offAction={() => fetch("api/ci/off")}
        state={new Date() < deviceData.heatingSchedule.heatingTime}
      />

      <ValveControl
        title={"Living Room"}
        pos={[x, y]}
        connection={true}
        onAction={() => fetch("/api/radiatorValves/livingRoom/open")}
        offAction={() => fetch("/api/radiatorValves/livingRoom/close")}
        state={deviceData.radiatorValves.livingRoom.isOpen ? true : false}
      />

      {/* <ValveControl
        title={"Kitchen"}
        pos={[x, y + 15]}
        connection={true}
        onAction={() => fetch("/api/radiatorValves/kitchen/open")}
        offAction={() => fetch("/api/radiatorValves/kitchen/close")}
        state={deviceData.radiatorValves.kitchen.isOpen ? true : false}
      /> */}

      <ValveControl
        title={"Liams Room"}
        pos={[x, y + 1 * 15]}
        connection={true}
        onAction={() => fetch("/api/radiatorValves/liamsRoom/open")}
        offAction={() => fetch("/api/radiatorValves/liamsRoom/close")}
        state={deviceData.radiatorValves.liamsRoom.isOpen ? true : false}
      />

      <ValveControl
        title={"Study"}
        pos={[x, y + 2 * 15]}
        connection={true}
        onAction={() => fetch("/api/radiatorValves/study/open")}
        offAction={() => fetch("/api/radiatorValves/study/close")}
        state={deviceData.radiatorValves.study.isOpen ? true : false}
      />

      <ValveControl
        title={"Our Room"}
        pos={[x, y + 3 * 15]}
        connection={true}
        onAction={() => fetch("/api/radiatorValves/ourRoom/open")}
        offAction={() => fetch("/api/radiatorValves/ourRoom/close")}
        state={deviceData.radiatorValves.ourRoom.isOpen ? true : false}
      />
    </>
  );
};

export default RadiatorFan;
