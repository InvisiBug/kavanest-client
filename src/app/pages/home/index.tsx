import React from "react";
import { PageTitle, powerOn } from "../../lib";
import styled from "@emotion/styled";

const colours = [
  // https://www.w3schools.com/colors/colors_picker.asp
  0xff4000, 0xff8000, 0xffbf00, 0xffff00, 0xbfff00, 0x80ff00, 0x40ff00, 0x00ff00, 0x00ff40, 0x00ff80, 0x00ffbf, 0x00ffff, 0x00bfff, 0x0080ff,
  0x0040ff, 0x0000ff, 0x4000ff, 0x8000ff, 0xbf00ff, 0xff00ff, 0xff00bf, 0xff0080, 0xff0040, 0xff0000,
];

const Home: React.FC = () => {
  return (
    <>
      <PageTitle>KavaNest</PageTitle>
      <Container>
        <h1>Room Power</h1>
        <Icon src={powerOn} onClick={() => console.log("Click")} />
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

const Text = styled.div`
  border: 1px solid grey;
`;

const Icon = styled.img`
  height: 128px;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  /* margin-top: 1.5rem; */
  user-select: none;
  cursor: pointer;
`;
