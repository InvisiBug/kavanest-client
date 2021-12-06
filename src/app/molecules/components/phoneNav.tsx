import React from "react";
import styled from "@emotion/styled";
import { home, setpoints, switches } from "../../atoms";

import { useAppContext } from "../../utils";

const navButtons = [
  {
    name: "home",
    icon: home,
  },
  {
    name: "setpoints",
    icon: setpoints,
  },
  {
    name: "switches",
    icon: switches,
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
  height: 100%;
  width: 100vw;
  background-color: rgb(255, 255, 255, 0.01);
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Icon = styled.img`
  height: 50%;
  /* border: 1px solid white; */
  /* margin-top: 20px; */
  /* margin-bottom: 20px; */
`;

export interface Props {}
