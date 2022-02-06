import React from "react";
import styled from "@emotion/styled";
import { home, setpoints, sensor, dog, rgbLight, plug, gears, computer, valve } from "../elements/icons";
import { mq, px } from "../elements/mediaQueries";
import { useAppContext } from "../../../utils";

const navButtons = [
  { name: "home", icon: home },
  { name: "rgbLights", icon: rgbLight },
  { name: "computer", icon: computer },
  { name: "setpoints", icon: setpoints },
  { name: "sensors", icon: sensor },
  { name: "valves", icon: valve },
  { name: "plugs", icon: plug },
  // { name: "gears", icon: gears },
  // { name: "dog", icon: dog },
];
const PhoneNav: React.FC<Props> = () => {
  const { screen, setScreen } = useAppContext();

  return (
    <>
      <Container>
        {navButtons.map((button) => {
          return (
            <Icon src={button.icon} alt={button.name} name={button.name} screen={screen} onClick={() => setScreen(button.name)} key={Math.random()} />
          );
        })}
        {/* <Text>button.name</Text> */}
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
