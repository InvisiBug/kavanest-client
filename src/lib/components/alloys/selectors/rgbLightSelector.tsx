import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Selector } from "src/lib/components";
import { useAppContext } from "src/lib/context";
import Details from "src/pages/components/rgbLights/components/details";
import { gql, useMutation } from "@apollo/client";
import { rgbToArray } from "src/lib/helpers";
import { RgbLight } from "src/gql/graphql";

const RGBLightSelector: React.FC<Props> = ({
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
        <Selector name={name} arrow={true} connected={connected} openDetails={openRGBLight} onClick={setOpenRGBLight}>
          <ColourIndicator red={red} green={green} blue={blue} />
        </Selector>

        {openRGBLight === name ? (
          <Details
            red={red}
            green={green}
            blue={blue}
            mode={mode}
            updateRGB={(rgb: string) => {
              const colours = rgbToArray(rgb);
              updateRGB({ variables: { input: { name, red: colours[0], green: colours[1], blue: colours[2] } } });
            }}
          />
        ) : null}
      </Container>
    </>
  );
};

export default React.memo(RGBLightSelector);

export interface Props {
  thisLight: RgbLight;
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

const ColourIndicator = styled.div`
  height: 2rem;
  width: 2rem;
  border-radius: 1rem;
  margin-right: 1rem;
  background-color: ${(props: { red: number; green: number; blue: number }) => `rgba(${props.red},${props.green},${props.blue})`};
`;
