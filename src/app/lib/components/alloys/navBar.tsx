import React from "react";
import styled from "@emotion/styled";
import { home, setpoints, switches, sensor, mq, px, dog } from "../elements";

import { useAppContext } from "../../../utils";

const navButtons = [
  {
    name: "home",
    icon: home,
  },
  {
    name: "sensors",
    icon: sensor,
  },
  {
    name: "setpoints",
    icon: setpoints,
  },
  {
    name: "switches",
    icon: switches,
  },
  {
    name: "dog",
    icon: dog,
  },
];
const PhoneNav: React.FC<Props> = () => {
  const { setScreen } = useAppContext();

  return (
    <>
      <Container>
        {navButtons.map((button) => {
          return <Icon src={button.icon} alt={button.name} onClick={() => setScreen(button.name)} key={Math.random()}></Icon>;
        })}
      </Container>
    </>
  );
};

export default PhoneNav;

const Container = styled.div`
  margin: auto;
  height: 100%;
  width: 100vw;
  background-color: rgb(255, 255, 255, 0.01);
  display: flex;
  align-items: center;
  justify-content: space-around;
  ${mq("large")} {
    /* background-color: orange; */
    max-width: ${px("medium")}px;
  }
`;

const Icon = styled.img`
  height: 50%;
  cursor: pointer;
`;

export interface Props {}
