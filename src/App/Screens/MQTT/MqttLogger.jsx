/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { localStorageParser } from "../../../Helpers/localStorageDriver";

import { jsx, css } from "@emotion/core";
import Styled from "@emotion/styled";

// TODO convert this to emotion

const Container = Styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 52%;
  left: 50%;
  /* height: 70%; */
  /* width: 60%; */

  border-radius: 20px;

  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(50, 50, 50, 0.1);
  font-family: Arial;
  font-size: 15px;

  // justifyContent: "space-around"
`;

const logWindow = css`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  color: white;
`;

const logLine = css`
  margin: 0px 10px 0px 10px;
  color: white;
  font-size: 16px;

  :first-of-type {
    margin-top: 20px;
  }
  :last-of-type {
    margin-bottom: 20px;
  }
`;

const MqttLogger = () => {
  const [log, setLog] = useState(localStorageParser("Mqtt"));

  useEffect(() => {
    const interval = setInterval(() => {
      setLog(localStorageParser("Mqtt"));
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <div css={logWindow}>
        {log.map(lines => (
          <p css={logLine} key={Math.random()}>
            {JSON.stringify(lines)}
          </p>
        ))}
      </div>
    </Container>
  );
};

export default MqttLogger;
