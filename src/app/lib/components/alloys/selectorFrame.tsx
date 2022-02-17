import React, { FC } from "react";
import styled from "@emotion/styled";
import { decamelize } from "../../../utils";
import { SelectorTitle, downArrow, rightArrow } from "../..";

const Selector: FC<any> = ({ setOpenDrawer, connected = true, openDrawer, name, arrow = true, children }) => {
  return (
    <>
      <Frame
        onClick={() => {
          if (setOpenDrawer) {
            setOpenDrawer(openDrawer === name ? "" : name);
          }
        }}
      >
        <SelectorTitle connected={connected}>{decamelize(name)}</SelectorTitle>
        {children}
        {arrow ? <Icon src={openDrawer === name ? downArrow : rightArrow} /> : <Blank />}
      </Frame>
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

const borders = true;

const Frame = styled.div`
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
  border: ${borders ? "1px solid green" : null};
  height: 20px;
  min-width: 20px;
`;

const Blank = styled.div`
  border: ${borders ? "1px solid pink" : null};
  min-width: 20px;
  min-height: 20px;
`;
