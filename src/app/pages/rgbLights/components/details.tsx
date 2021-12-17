import React from "react";
import styled from "@emotion/styled";
import { on, off, disconnected } from "../../../lib";

import ColourWheel from "../../../lib/components/alloys/colourWheel/colourWheel";
const RGBLightDetails: React.FC<any> = ({ red, green, blue }) => {
  return (
    <>
      <Details>
        {/* <Text>{`Red:${red}`}</Text> */}
        {/* <Text>{`Green:${green}`}</Text> */}
        {/* <Text>{`Blue:${blue}`}</Text> */}
        <Wheel>
          <ColourWheel
            name={`${Math.random()}`}
            radius={125}
            padding={10}
            lineWidth={40}
            onColourSelected={(rgb: any) => console.log(rgb)}
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
      </Details>
    </>
  );
};

//  {/* {lights.map(({ light: { name, connected, red, green, blue, mode } }: Test) => { */}
//       {/* {lights.map((light: any) => {
//         const { name, connected, red, green, blue, mode }: Args = light;

//         return (
//           <>
//             <Container>
//               <Header onClick={() => setDetails(!details)}>
//                 <Room>{decamelize(name)}</Room>
//                 <Icon src={details ? downArrow : rightArrow} />
//               </Header>

//                <div>{name}</div>
//               <div>{connected}</div>
//               <div>{red}</div>
//               <div>{green}</div>
//               <div>{blue}</div>
//               <div>{mode}</div>
//             </Container>
//           </>
//         );
//       })} */}

export default RGBLightDetails;

// interface Props {
//   name: string;
//   state: boolean;
//   connected: boolean;
//   click: () => void;
// }

const Details = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

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
