import React, { FC } from "react";
import styled from "@emotion/styled";
import { decamelize } from "../../../utils";
import { SelectorTitle, downArrow, rightArrow } from "../..";

const Selector: FC<Props> = ({ onClick, connected = true, openDetails, name, arrow = true, children }) => {
  return (
    <>
      <Frame
        onClick={() => {
          if (onClick) {
            onClick(openDetails === name ? "" : name);
          }
        }}
      >
        <SelectorTitle connected={connected}>{decamelize(name)}</SelectorTitle>
        {children}
        {arrow ? <Icon src={openDetails === name ? downArrow : rightArrow} /> : <Blank />}
      </Frame>
    </>
  );
};

export default Selector;

interface Props {
  onClick?: any;
  connected?: boolean;
  openDetails?: string;
  arrow?: boolean;
  name: string;
  children: any;
}

const borders = false;

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
