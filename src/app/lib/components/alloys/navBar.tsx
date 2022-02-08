import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { home, setpoints, sensor, dog, rgbLight, plug, gears, computer, valve } from "../elements/icons";
import { mq, px } from "../elements/mediaQueries";
import { useAppContext } from "../../../utils";

const navButtons = [
  // { name: "home", icon: home },
  { name: "rgbLights", icon: rgbLight, admin: true },
  { name: "computer", icon: computer, admin: true },
  { name: "setpoints", icon: setpoints, guest: true },
  { name: "sensors", icon: sensor, admin: true },
  { name: "valves", icon: valve, admin: true },
  { name: "plugs", icon: plug, admin: true },
  // { name: "gears", icon: gears },
  // { name: "dog", icon: dog },
];
const PhoneNav: React.FC<Props> = () => {
  const { screen, setScreen } = useAppContext();

  const [isAdmin, setIsAdmin] = useState(true);
  const allowed: boolean = localStorage.getItem("admin") === "true" || false;

  // useEffect(() => {
  //   setIsAdmin(allowed);
  //   setInterval(() => {
  //     setIsAdmin(Boolean(localStorage.getItem("admin") === "true" || false));
  //   }, 1 * 1000);
  // }, []); //eslint-disable-line

  return (
    <>
      <Container>
        {navButtons.map((button) => {
          if (isAdmin) {
            return (
              <Icon
                src={button.icon}
                alt={button.name}
                name={button.name}
                screen={screen}
                onClick={() => setScreen(button.name)}
                key={Math.random()}
              />
            );
          } else if (!button.admin) {
            return (
              <Icon
                src={button.icon}
                alt={button.name}
                name={button.name}
                screen={screen}
                onClick={() => setScreen(button.name)}
                key={Math.random()}
              />
            );
          }
        })}
      </Container>
    </>
  );
};

export default PhoneNav;

const Container = styled.div`
  /* border: 1px solid red; */
  margin: auto;
  height: 100%;
  /* width: 100vw; */
  background-color: rgb(255, 255, 255, 0.01);
  display: flex;
  align-items: center;
  justify-content: space-around;
  ${mq("large")} {
    flex-direction: column;
    width: 100%;
    /* background-color: orange; */
    /* max-width: ${px("medium")}px; */
  }
`;

// const Text = styled.div`
//   border: 1px solid red;
//   visibility: hidden;
// `;

const Icon = styled.img`
  height: 50%;
  ${mq("large")} {
    height: 5%;
    /* background-color: orange; */
    /* max-width: ${px("medium")}px; */
  }
  cursor: pointer;

  /* background: linear-gradient(to top, #3204fdba, #9907facc) no-repeat top center; */

  /* background-color: ${(props: { name: string; screen: string }) => (props.name === props.screen ? "red" : null)}; */
  /* filter: ${(props: { name: string; screen: string }) =>
    props.name === props.screen ? "brightness(40%) sepia(100%) saturate(300%) opacity(90%) hue-rotate(75deg)" : null}; */

  filter: ${(props: { name: string; screen: string }) => (props.name === props.screen ? "opacity(100%)" : "opacity(50%)")};

  /* filter: brightness(100%) sepia(100%) saturate(10000%) opacity(50%) hue-rotate(55deg); */
`;

export interface Props {}
