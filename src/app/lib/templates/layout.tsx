import React from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { mq, px } from "..";
import { PhoneNav } from "..";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Global styles={globalStyles} />
      <AppWindow>
        <Top>
          <Container>{children}</Container>
        </Top>
        <Bottom>
          <PhoneNav />
        </Bottom>
      </AppWindow>
    </>
  );
};

const AppWindow = styled.div`
  background-color: #1f1f1f;

  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
  padding: 0;
`;

const Top = styled.div`
  overflow-y: auto;
  height: 100px;
  width: 100vw;
  flex-grow: 1;
`;

const Bottom = styled.div`
  height: 50px; // This need to be a pixel value for the navbar to work
  width: 100vw;
`;

const Container = styled.div`
  margin: auto;
  ${mq("small")} {
    background-color: red;
    min-width: ${px("small")}px;
    /* min-width: 10px; */
  }
  ${mq("medium")} {
    background-color: orange;
    min-width: ${px("medium")}px;
  }
  ${mq("large")} {
    background-color: orange;
    max-width: ${px("large")}px;
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
