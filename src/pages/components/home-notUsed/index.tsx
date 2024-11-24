import { useState, useEffect } from "react";
import { PageTitle, powerOn } from "@/lib/components";
import styled from "@emotion/styled";
import palettes from "nice-color-palettes";

const Home: React.FC = () => {
  const [colours, setColours] = useState<string[]>();
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
