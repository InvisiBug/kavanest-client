import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { home, setpoints, sensor, dog, rgbLight, plug, gears, computer, valve, bed } from "@/lib/ui/elements/icons";
import { mq, px } from "../../mediaQueries";
import { decamelize } from "@/lib/helpers";
import { useNavigate, useLocation } from "react-router-dom";

import { useAppContext } from "@/lib/context";

const navButtons = [
  // { name: "home", icon: home },
  { name: "setpoints", icon: setpoints, guest: true },
  { name: "lights", icon: rgbLight, admin: true },
  { name: "computer", icon: computer, admin: true },
  // { name: "sensors", icon: sensor, admin: true },
  // { name: "valves", icon: valve, admin: true },
  // { name: "plugs", icon: plug, admin: true },
  { name: "bed", icon: bed, admin: true },
  // { name: "gears", icon: gears },
];
const PhoneNav: React.FC<Props> = () => {
  const { screen, setScreen } = useAppContext();
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(true);
  const allowed: boolean = localStorage.getItem("admin") === "true" || false;
  const currentLocation = useLocation().pathname.replace("/", "");

  // useEffect(() => {
  //   setIsAdmin(allowed);
  //   setInterval(() => {
  //     setIsAdmin(Boolean(localStorage.getItem("admin") === "true" || false));
  //   }, 1 * 1000);
  // }, []); //eslint-disable-line

  //? Navbar position is set in the layout.tsx file
  return (
    <>
      <Container>
        {navButtons.map((button) => {
          if (isAdmin) {
            return (
              <Group onClick={() => setScreen(button.name)} key={Math.random()}>
                {/* <Group onClick={() => navigate(button.name)} key={Math.random()}> */}
                <Icon src={button.icon} alt={button.name} name={button.name} screen={screen} />
                <Text>{decamelize(button.name)}</Text>
              </Group>
            );
          } else if (!button.admin) {
            return (
              <Icon
                src={button.icon}
                alt={button.name}
                name={button.name}
                screen={currentLocation}
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

const borders = false;

const Container = styled.div`
  border: ${borders ? "1px solid yellow" : "none"};
  margin: auto;
  height: 100%;
  /* width: 100vw; */
  background-color: rgb(255, 255, 255, 0.01);
  display: flex;
  align-items: center;
  justify-content: space-around;
  ${mq("large")} {
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    border-right: 1px solid grey;
    /* background-color: orange; */
    /* max-width: ${px("medium")}px; */
  }
`;

const Text = styled.div`
  border: ${borders ? "1px solid red" : "none"};
  visibility: hidden;
  max-width: 0;
  ${mq("large")} {
    visibility: visible;
    max-width: none;
    margin-top: 0.5rem;
  }
`;

const Group = styled.div`
  border: ${borders ? "1px solid orange" : "none"};
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mq("large")} {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 10%;
    align-items: center;
    border-bottom: 1px solid grey;

    cursor: pointer;
  }
`;

const Icon = styled.img`
  height: 100%;
  border: ${borders ? "1px solid green" : "none"};
  ${mq("large")} {
    /* width: 50%; */
    height: 50%;
    /* object-fit: cover; */
    /* margin-top: 20px; */
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
