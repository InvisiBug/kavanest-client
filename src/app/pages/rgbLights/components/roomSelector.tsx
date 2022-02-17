import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Selector } from "../../../lib";
import { useAppContext } from "../../../utils";
import Details from "./details";
import { gql, useMutation } from "@apollo/client";

const RoomSelector: React.FC<any> = ({
  thisLight: { name, red, green, blue, mode, connected, _id },
  allRgbLights,
  setRgbLights,
  openRGBLight,
  setOpenRGBLight,
}) => {
  const { socket } = useAppContext();
  const [updateRGB] = useMutation(mutation, {});

  useEffect(() => {
    if (_id) {
      socket.on(_id, (payload: any) => {
        const updatedRgbLights: Array<any> = [...allRgbLights];

        for (let key in updatedRgbLights) {
          if (updatedRgbLights[key].name === name) {
            updatedRgbLights[key] = payload;
          }
        }

        setRgbLights(updatedRgbLights);
      });
    }

    return function cleanup() {
      socket.off(_id);
    };
  }, []); // eslint-disable-line

  return (
    <>
      <Container>
        <Selector name={name} connected={connected} openDrawer={openRGBLight} setOpenDrawer={setOpenRGBLight}>
          <ColourIndicator red={red} green={green} blue={blue} />
        </Selector>

        {openRGBLight === name ? (
          <Details
            red={red}
            green={green}
            blue={blue}
            mode={mode}
            updateRGB={(rgb: any) => {
              const colours = rgb
                .split("(")[1]
                .split(")")[0]
                .split(",")
                .map((x: string) => {
                  return parseInt(x);
                });

              updateRGB({ variables: { input: { name, red: colours[0], green: colours[1], blue: colours[2] } } });
            }}
          />
        ) : null}
      </Container>
    </>
  );
};

export default RoomSelector;

export interface Props {
  lightData: {
    name: string;
    connected: boolean;
    red: number;
    green: number;
    blue: number;
    mode?: number;
  };
  openRGBLight: string;
  setOpenRGBLight: (name: string) => void;
}

const mutation = gql`
  mutation ($input: RGBLightInput) {
    updateRGBLights(input: $input) {
      red
      green
      blue
    }
  }
`;

const Container = styled.div`
  color: white;
  border-bottom: 1px solid grey;
  :first-of-type {
    border-top: 1px solid grey;
    margin-top: 50px;
  }

  display: flex;
  flex-direction: column;
  margin: auto;
`;

const ColourIndicator = styled.div`
  height: 2rem;
  width: 2rem;
  border-radius: 1rem;
  margin-right: 1rem;
  background-color: ${(props: { red: number; green: number; blue: number }) => `rgba(${props.red},${props.green},${props.blue})`};
`;
