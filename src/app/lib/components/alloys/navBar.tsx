import React from "react";
import styled from "@emotion/styled";
import { home, setpoints, sensor, dog, rgbLight, plug } from "../elements/icons";
import { mq, px } from "../elements/mediaQueries";
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
    name: "plugs",
    icon: plug,
  },
  {
    name: "rgbLights",
    icon: rgbLight,
  },
  {
    name: "dog",
    icon: dog,
  },
];
const PhoneNav: React.FC<Props> = () => {
  const { screen, setScreen } = useAppContext();

  return (
    <>
      <Container>
        {navButtons.map((button) => {
          return (
            <Icon
              src={button.icon}
              alt={button.name}
              name={button.name}
              screen={screen}
              onClick={() => setScreen(button.name)}
              key={Math.random()}
            ></Icon>
          );
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
  /* background: linear-gradient(to top, #3204fdba, #9907facc) no-repeat top center; */

  /* background-color: ${(props: { name: string; screen: string }) => (props.name === props.screen ? "red" : null)}; */
  filter: ${(props: { name: string; screen: string }) =>
    props.name === props.screen ? "brightness(40%) sepia(100%) saturate(300%) opacity(90%) hue-rotate(75deg)" : null};

  filter: ${(props: { name: string; screen: string }) => (props.name === props.screen ? "opacity(50%)" : null)};
  /* filter: brightness(100%) sepia(100%) saturate(10000%) opacity(50%) hue-rotate(55deg); */
`;

export interface Props {}
