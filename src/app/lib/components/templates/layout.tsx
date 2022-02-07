import React from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { mq, px } from "../../";
import { NavBar } from "../../";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Global styles={globalStyles} />
      <AppWindow>
        <Top>
          <Container>{children}</Container>
        </Top>
        <Bottom>
          <NavBar />
        </Bottom>
      </AppWindow>
    </>
  );
};

export default Layout;

const borders: boolean = false;

const AppWindow = styled.div`
  position: fixed;
  border: ${borders ? "1px solid green" : "none"};
  background-color: #1f1f1f;

  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 100vw;
  padding: 0;
  /* border: 1px solid red; */

  ${mq("large")} {
    flex-direction: row;
    align-items: center;
  }
`;

const Top = styled.div`
  border: ${borders ? "1px solid yellow" : "none"};
  overflow-y: auto;
  width: 100vw;
  flex-grow: 1;
`;

const Bottom = styled.div`
  border: ${borders ? "1px solid pink" : "none"};
  height: 50px; // This need to be a pixel value for the navbar to work
  width: 100vw;

  ${mq("large")} {
    order: -1;
    height: 100vh;
    width: 10vw;
  }
  margin-top: auto;
`;

const Container = styled.div`
  max-width: 90vw;
  margin: auto;
  /* ${mq("small")} { */
  /* background-color: red; */
  /* min-width: ${px("small")}px; */
  /* min-width: 10px; */
  /* } */
  /* ${mq("medium")} { */
  /* background-color: orange; */
  /* min-width: ${px("medium")}px; */
  /* } */
  ${mq("large")} {
    max-width: 75vw;
    /* background-color: orange; */
    /* max-width: ${px("large")}px; */
    /* height: 1000px; */
  }
`;

const globalStyles = css`
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    user-select: none;
    scroll;
  }
`;
