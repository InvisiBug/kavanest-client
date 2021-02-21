/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React, { useState, useEffect } from "react";
import OpenControls from "./OpenControls";
import RoomModal from "./RoomModal";

import Rooms from "./FloorPlan.jsx";
import ControlsModal from "./ControlsModal";
import ActiveIndicator from "./ControlsModal/ActiveIndicator";

const Climate = () => {
  const [roomModal, setRoomModal] = useState(false);
  const [controlsModal, setControlsModal] = useState(false);
  const [room, setRoom] = useState();

  const showRoomModal = (room) => {
    setRoomModal(true);
    setRoom(room);
  };

  const closeModal = () => {
    setRoomModal(false);
    setControlsModal(false);
  };

  const showControlsModal = () => {
    setControlsModal(true);
    console.log("re");
  };

  return (
    <>
      <Rooms blurred={roomModal || controlsModal} showGraph={showRoomModal} />
      <ActiveIndicator blurred={roomModal || controlsModal} />
      {roomModal || controlsModal ? null : <OpenControls showControlsModal={showControlsModal} />}
      {roomModal ? <RoomModal room={room} closeModal={closeModal} /> : null}
      {controlsModal ? <ControlsModal closeModal={closeModal} /> : null}
    </>
  );
};

export default Climate;
