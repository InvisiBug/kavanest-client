/** @jsx jsx */
import React from "react";
import { useEffect, useState } from "react";
import Active from "../../../../Ui Library/Icons/Active.png";
import { jsx, css } from "@emotion/core";

const ActiveIndicator = ({ blurred }) => {
  const [deviceData, setActive] = useState(JSON.parse(localStorage.getItem("Heating")));

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(JSON.parse(localStorage.getItem("Heating")));
    }, 100);
    return () => clearTimeout(timer);
  }, [deviceData]);

  if (deviceData.isOn) {
    return <img src={Active} alt="" css={[container, blurred ? blur : null]} />;
  } else return null;

  // return deviceData.isOn && <img src={Active} alt="" css={container} />;
};

export default ActiveIndicator;

const container = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 64px;
  width: 64px;
  top: 22%;
  left: 50%;
  opacity: 0.8;
`;

const blur = css`
  filter: blur(20px);
`;
