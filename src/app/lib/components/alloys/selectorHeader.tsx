import React, { FC } from "react";
import styled from "@emotion/styled";
import { decamelize } from "../../../utils";
import { Room, downArrow, rightArrow, on, off, disconnected } from "../../";

const Selector: FC<Props> = ({ setOpenDrawer, openDrawer, name, children }) => {
  return (
    <>
      <Header
        onClick={() => {
          setOpenDrawer(openDrawer === name ? "" : name);
        }}
      >
        <Room>{decamelize(name)}</Room>
        {children}
        <Icon src={openDrawer === name ? downArrow : rightArrow} />
      </Header>
    </>
  );
};

export default Selector;

interface Props {
  setOpenDrawer: any;
  openDrawer: any;
  name: any;
  children: any;
}

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin: auto;
  justify-content: space-around;
  min-height: 0px;
  cursor: pointer;
`;

const Icon = styled.img`
  height: 20px;
`;

const StateIndicator = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 1rem;
  margin-right: 1rem;
  background-color: ${(props: { state: boolean; connected: boolean }) => (props.connected ? (props.state ? on : off) : disconnected)};
`;
