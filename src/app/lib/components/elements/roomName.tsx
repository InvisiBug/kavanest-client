import React from "react";
import styled from "@emotion/styled";

const RoomName: React.FC<Props> = ({ children, connected = true }) => {
  return (
    <>
      <Room connected={connected}>{children}</Room>
    </>
  );
};

export default RoomName;

interface Props {
  children: string;
  connected?: boolean;
}

const Room = styled.h3`
  display: item;
  align-self: center;
  flex-grow: 1;
  font-size: 1.2rem;
  color: ${(props: { connected: boolean }) => (props.connected ? "white" : "orangered")};
`;
