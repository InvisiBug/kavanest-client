import React from "react";
import styled from "@emotion/styled";
import { on, off, disconnected } from "../../../lib";
import ColourWheel from "../../../lib/components/alloys/colourWheel/colourWheel";

const RGBLightDetails: React.FC<Props> = ({ red, green, blue, mode, clicked }) => {
  if (mode !== undefined) console.log(mode);

  return (
    <>
      <Details>
        <Wheel>
          <ColourWheel
            name={Math.random()}
            radius={125}
            padding={10}
            lineWidth={40}
            onColourSelected={(rgb: any) => clicked(rgb)}
            spacers={{
              colour: "whitesmoke",
              shadowColour: "grey",
              shadowBlur: 0,
            }}
            onRef={(ref: any) => ref}
            preset
            presetColour={`rgb(${red},${green},${blue})`}
            animated
          />
        </Wheel>
        {/* <h1>Mode 1</h1> */}
        {/* <h1>Mode 2</h1> */}
      </Details>
    </>
  );
};

export default RGBLightDetails;

interface Props {
  red: string;
  green: string;
  blue: string;
  mode: number;
  clicked: (rgb: string) => void;
}

const Details = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;

  /* display: grid; */
  /* grid-gap: 5px; */
  /* grid-template-columns: repeat(2, 1fr); */

  /* margin-bottom: 20px; */
`;

const Wheel = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Button = styled.img`
  height: 4rem;
  width: 4rem;
  /* border-radius: 25px; */
  /* background-color: ${(props: { state: boolean; connected: boolean }) => (props.connected ? (props.state ? on : off) : disconnected)}; */
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;
