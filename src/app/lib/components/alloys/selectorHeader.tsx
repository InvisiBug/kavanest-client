import React, { FC } from "react";
import styled from "@emotion/styled";
import { decamelize } from "../../../utils";
import { Room, downArrow, rightArrow } from "../../";

const Selector: FC<Props> = ({ setOpenDrawer, connected = true, openDrawer, name, children }) => {
  return (
    <>
      <Header
        onClick={() => {
          if (setOpenDrawer) {
            setOpenDrawer(openDrawer === name ? "" : name);
          }
        }}
      >
        <Room connected={connected}>{decamelize(name)}</Room>
        {children}
        <Icon src={openDrawer === name ? downArrow : rightArrow} />
      </Header>
    </>
  );
};

export default Selector;

interface Props {
  setOpenDrawer?: any;
  openDrawer: any;
  name: any;
  children: any;
  connected?: boolean;
}

const borders: boolean = false;

const Header = styled.div`
  border: ${borders ? "1px solid white" : null};
  display: flex;
  width: 100%;
  align-items: center;
  margin: auto;
  justify-content: space-around;
  min-height: 0px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const Icon = styled.img`
  border: ${borders ? "1px solid pruple" : null};
  height: 20px;
`;
