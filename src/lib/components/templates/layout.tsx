import React from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { mq, px } from "src/lib/mediaQueries";
import { NavBar } from "src/lib/components";

export const Layout: React.FC<any> = ({ children }) => {
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
  position: fixed;
  /* border: ${borders ? "1px solid green" : "none"}; */
  background-color: #1f1f1f;

  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 100vw;
  padding: 0;
  /* border: 1px solid red; */

  ${mq("large")} {
    flex-direction: row;
    align-items: flex-start;
    /* overflow: scroll; */
  }
`;

const Content = styled.div`
  border: ${borders ? "1px solid yellow" : "none"};
  overflow-y: auto;
  /* width: 50vw; */
  flex-grow: 1;
  padding: 0 5% 0 5%;
  ${mq("large")} {
    min-height: 100%;
    /* align-items: flex-start; */
  }
`;

const Nav = styled.div`
  border: ${borders ? "1px solid pink" : "none"};
  height: 50px; // This need to be a pixel value for the navbar to work
  width: 100vw;

  ${mq("large")} {
    order: -1;
    height: 100vh;
    min-width: 100px;
    width: 5vw;
  }
  margin-top: auto;
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
    /* overflow: scroll; */
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
