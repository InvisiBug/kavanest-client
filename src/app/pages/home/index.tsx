import React, { useState, useEffect } from "react";
import { PageTitle, powerOn } from "../../lib";
import styled from "@emotion/styled";
import palettes from "nice-color-palettes";

// const colours = [
//   // https://www.w3schools.com/colors/colors_picker.asp
//   0xff4000, 0xff8000, 0xffbf00, 0xffff00, 0xbfff00, 0x80ff00, 0x40ff00, 0x00ff00, 0x00ff40, 0x00ff80, 0x00ffbf, 0x00ffff, 0x00bfff, 0x0080ff,
//   0x0040ff, 0x0000ff, 0x4000ff, 0x8000ff, 0xbf00ff, 0xff00ff, 0xff00bf, 0xff0080, 0xff0040, 0xff0000,
// ];

const Home: React.FC = () => {
  const [colours, setColours] = useState<any>();
  // const colours: Array<any> = palettes[Math.floor(Math.random() * 100) + 0];

  useEffect(() => {
    setColours(palettes[Math.floor(Math.random() * 100) + 0]);
  }, []); //eslint-disable-line

  if (!colours) return <></>;

  return (
    <>
      <PageTitle>KavaNest</PageTitle>
      <Container>
        <h1>Room Power</h1>
        <Icon src={powerOn} onClick={() => console.log("Click")} />
        <Colours onClick={() => setColours(palettes[Math.floor(Math.random() * 100) + 0])}>
          {colours.map((colour: any) => {
            return <Colour colour={colour} key={colour}></Colour>;
          })}
        </Colours>
      </Container>
    </>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Colours = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 3rem;
`;

const Colour = styled.div`
  height: 100px;
  width: 100px;
  border-radius: 50;
  background-color: ${(props: { colour: any }) => `${props.colour}`};
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 40px;
`;

const Icon = styled.img`
  height: 128px;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  /* margin-top: 1.5rem; */
  user-select: none;
  cursor: pointer;
`;
