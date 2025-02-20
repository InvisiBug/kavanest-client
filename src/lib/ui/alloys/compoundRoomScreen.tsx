import { FC } from "react";
import { Heating, Title, Status, Override, Schedule } from "./heating";

const RoomSetpoints: FC<Props> = ({ name, close, showTitle = true }) => {
  return (
    <>
      <Heating name={name}>
        {showTitle && <Title close={close} />}
        <Status />
        <Override />
        <Schedule />
      </Heating>
    </>
  );
};

export default RoomSetpoints;

export interface Props {
  name?: string;
  close?: () => void;
  showTitle?: boolean;
}
