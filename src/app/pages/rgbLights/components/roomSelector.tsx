import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { downArrow, rightArrow, Room } from "../../../lib";
import { decamelize, useAppContext } from "../../../utils";
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
  const [updateRGB] = useMutation(mutation, {
    onCompleted() {
      console.log("Mutation Completed");
    },
  });
  // console.log(name, red, green, blue);

  useEffect(() => {
    if (_id) {
      socket.on(_id, (payload: any) => {
        console.log(payload);
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

  const clicked = (rgb: string) => {
    const a = rgb.split("(")[1].split(")")[0];
    const splitable = a.split(",");

    const colours = splitable.map(function (x) {
      return parseInt(x);
    });

    updateRGB({ variables: { input: { name, red: colours[0], green: colours[1], blue: colours[2] } } });
  };

  return (
    <>
      <Container>
        <Header onClick={() => setOpenRGBLight(openRGBLight === name ? "" : name)}>
          <Room connected={connected}>{decamelize(name)}</Room>
          <ColourIndicator red={red} green={green} blue={blue} />
          <Icon src={openRGBLight === name ? downArrow : rightArrow} />
        </Header>
        {openRGBLight === name ? <Details red={red} green={green} blue={blue} clicked={(rgb: any) => clicked(rgb)} /> : null}
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

const getInfo = gql`
  query ($name: String) {
    response: getRGBLight(name: $name) {
      name
      red
      blue
      green
      connected
      mode
    }
  }
`;

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

const ColourIndicator = styled.div`
  height: 2rem;
  width: 2rem;
  border-radius: 1rem;
  margin-right: 1rem;
  background-color: ${(props: { red: number; green: number; blue: number }) => `rgba(${props.red},${props.green},${props.blue})`};
`;
