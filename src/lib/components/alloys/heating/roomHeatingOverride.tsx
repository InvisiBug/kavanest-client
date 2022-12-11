import React, { FC } from "react";
import { useRoom } from "./roomHeating";
import OverrideControls from "./heatingOverride/overrideControls";

const Override: FC = () => {
  const { borders, name } = useRoom();

  return (
    <>
      <OverrideControls room={name} />
    </>
  );
};

export default Override;
