import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Selector, RBGStateIndicator } from "src/lib/components";
import { useAppContext } from "src/lib/context";
import Details from "./rgbLightDetails";
import { gql, useMutation } from "@apollo/client";
import { rgbToArray } from "src/lib/helpers";

const RGBLightSelector: React.FC<any> = ({
  thisLight: { name, red, green, blue, mode, connected, _id },
  allRgbLights,
  setRgbLights,
  openRGBLight,
  setOpenRGBLight,
  children,
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

  // console.log(openRGBLight);

  return (
    <>
      <Container>
        <Selector name={name} arrow={true} connected={connected} openDetails={openRGBLight} onClick={setOpenRGBLight}>
          <RBGStateIndicator red={red} green={green} blue={blue} />
        </Selector>

        {openRGBLight === name ? (
          <Details
            red={red}
            green={green}
            blue={blue}
            mode={mode}
            updateRGB={(newRGBVal: string) => {
              const colours = rgbToArray(newRGBVal);
              updateRGB({ variables: { input: { name, red: colours[0], green: colours[1], blue: colours[2] } } });
            }}
          />
        ) : null}
      </Container>
    </>
  );
};

export default RGBLightSelector;

export interface Props {
  thisLight: {
    name: string;
    connected: boolean;
    red: number;
    green: number;
    blue: number;
    mode?: number;
    _id: string;
  };
  allRgbLights: any;
  openRGBLight: string;
  setRgbLights: any;
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
