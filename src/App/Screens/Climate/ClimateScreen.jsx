/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React, { useState, useEffect } from "react";
import ControlsButton from "./OpenControls";
import RoomModal from "./RoomModal/RoomModal";

import ActiveIndicator from "./ControlsModal/Components/ActiveIndicator";
import ControlsModal from "./ControlsModal/ControlsModal";
import Rooms from "./FloorPlan.jsx";

const Climate = () => {
  // const [roomModal, setRoomModal] = useState(false);
  // const [controlsModal, setControlsModal] = useState(false);
  // const [room, setRoom] = useState();

  const [roomModal, setRoomModal] = useState(true);
  const [controlsModal, setControlsModal] = useState(false);
  const [room, setRoom] = useState("Study");

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
  };

  const modalControl = () => {
    if (roomModal) {
      return <RoomModal room={room} closeModal={closeModal} />;
    } else if (controlsModal) {
      return <ControlsModal closeModal={closeModal} />;
    } else {
      return <ControlsButton showControlsModal={showControlsModal} />;
    }
  };

  return (
    <>
      <Rooms blurred={roomModal || controlsModal} showGraph={showRoomModal} />
      <ActiveIndicator blurred={roomModal || controlsModal} />
      {modalControl()}
    </>
  );
};

export default Climate;

// {roomModal || controlsModal ? null : <OpenControls showControlsModal={showControlsModal} /> /* Swow controls  if no other modal is open*/}
//       {roomModal ? <RoomModal room={room} closeModal={closeModal} /> : null}
//       {controlsModal ? <ControlsModal closeModal={closeModal} /> : null}
