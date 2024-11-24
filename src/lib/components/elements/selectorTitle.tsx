import React from "react";
import styled from "@emotion/styled";
import { disconnectedDeviceTextColour, textColour } from "@/lib/constants";

const SelectorTitle: React.FC<Props> = ({ children, onClick, connected = true }) => {
  return (
    <>
      <Room connected={connected} onClick={onClick}>
        {children}
      </Room>
    </>
  );
};

export default SelectorTitle;

interface Props {
  children: string;
  connected?: boolean;
  onClick?: () => void;
}

const Room = styled.h3<Props>`
  display: item;
  align-self: center;
  flex-grow: 1;
  font-size: 1.2rem;
  color: ${({ connected }) => (connected ? textColour : disconnectedDeviceTextColour)};
`;
