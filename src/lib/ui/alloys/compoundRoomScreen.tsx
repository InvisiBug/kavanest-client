import { FC } from "react";
import { Heating, Title, Status, Override, Schedule } from "./heating";

const RoomSetpoints: FC<Props> = ({ name, close }) => {
  return (
    <>
      <Heating name={name}>
        <Title close={close} />
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
  close: () => void;
}
