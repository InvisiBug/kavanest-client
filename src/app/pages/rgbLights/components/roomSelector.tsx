import React, { useState } from "react";
import styled from "@emotion/styled";
import { downArrow, rightArrow, Room } from "../../../lib";
import { decamelize } from "../../../utils";
import Details from "./details";
import { useQuery, gql, useMutation } from "@apollo/client";

const RoomSelector: React.FC<Props> = ({ lightData: { name } }) => {
  const { loading, error, data, refetch } = useQuery(getInfo, { variables: { name }, fetchPolicy: "no-cache" });
  const [details, setDetails] = useState<boolean>(false);

  const [updateRGB] = useMutation(mutation, {
    onCompleted() {
      refetch();
    },
  });

  if (loading) return <></>;
  if (error) return <></>;

  const {
    response: { red, green, blue, connected },
  } = data;

  const clicked = (rgb: string) => {
    var a = rgb.split("(")[1].split(")")[0];
    const splitable = a.split(",");
    var colours = splitable.map(function (x) {
      return parseInt(x);
    });

    updateRGB({ variables: { input: { name, red: colours[0], green: colours[1], blue: colours[2] } } });
  };

  return (
    <>
      <Container>
        <Header onClick={() => setDetails(!details)}>
          <Room connected={connected}>{decamelize(name)}</Room>
          <ColourIndicator red={red} green={green} blue={blue} />
          <Icon src={details ? downArrow : rightArrow} />
        </Header>
        {details ? <Details red={red} green={green} blue={blue} clicked={(rgb: any) => clicked(rgb)} /> : null}
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
