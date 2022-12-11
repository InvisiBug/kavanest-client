import React, { FC } from "react";

import Room, { Title, Status, Override } from "./heating/roomHeating";

const RoomSetpoints: FC<Props> = ({ name, close }) => {
  return (
    <>
      <Room name={name}>
        <Title />
        <Status />
        <Override />
      </Room>
    </>
  );
};

export default RoomSetpoints;

export interface Props {
  name: string;
  close?: () => void;
}
