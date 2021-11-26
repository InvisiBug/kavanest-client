import React from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { mq, px } from "../lib/mediaQueries";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Global styles={globalStyles} />
      <AppWindow>
        <Container>{children}</Container>
      </AppWindow>
    </>
  );
};

const AppWindow = styled.div`
  background-color: #343434;

  display: flex;
  min-height: 100vh;
  width: 100%;
  padding: 0;
`;

const Container = styled.div`
  margin: auto;
  ${mq("small")} {
    /* background-color: red; */
    min-width: ${px("small")}px;
    /* min-width: 10px; */
  }
  ${mq("medium")} {
    /* background-color: orange; */
    min-width: ${px("medium")}px;
  }
  ${mq("large")} {
    /* background-color: orange; */
    min-width: ${px("large")}px;
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
  }
`;
