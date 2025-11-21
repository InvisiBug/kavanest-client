import React from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { mq, px } from "@/lib/mediaQueries";
import { NavBar } from "@/lib/ui";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Global styles={globalStyles} />
      <AppWindow>
        <Content>{children}</Content>
        <Nav>
          <NavBar />
        </Nav>
      </AppWindow>
    </>
  );
};

export default Layout;

const borders = false;

const AppWindow = styled.div`
  /* position: fixed; */
  border: ${borders ? "1px solid green" : "none"};
  background-color: #1f1f1f;

  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  overflow-x: hidden;
  padding: 0;
  margin: 0 0 0 0;
  box-sizing: border-box;
  /* border: 1px solid red; */

  ${mq("large")} {
    flex-direction: row;
    align-items: flex-start;
    /* overflow: auto; */
  }
`;

const Content = styled.div`
  border: ${borders ? "1px solid yellow" : "none"};
  /* overflow-y: auto; */
  /* height: 1000px; */
  /* width: 50vw; */
  /* flex-grow: 1; */
  flex: 1 0 auto;
  padding: 0 5% 0 5%;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  ${mq("large")} {
    /* min-height: 100%; */
    /* align-items: flex-start; */
  }
`;

const Nav = styled.div`
  border: ${borders ? "1px solid pink" : "none"};
  height: 50px; // This need to be a pixel value for the navbar to work
  width: 100%;
  box-sizing: border-box;

  ${mq("large")} {
    order: -1;
    height: 100vh;
    min-width: 100px;
    width: 5vw;
  }
  /* margin-top: auto; */
  flex-shrink: 0;
`;

const globalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    user-select: none;
    /* overflow: scroll; */
    -ms-overflow-style: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  #root {
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }
`;
