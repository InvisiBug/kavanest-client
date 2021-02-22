/** @jsx jsx */
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { jsx, css } from "@emotion/core";

import ColourWheel from "../../Ui Library/ColourWheel/ColourWheel";
import { apiFetch, apiPost } from "../../../Helpers/fetch";

const DeskLEDs = () => {
  const [titleColour, setTitleColour] = useState("white");
  const [colour, setColour] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      getCurrentColour();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const getCurrentColour = () => {
    var cache = JSON.parse(localStorage.getItem("Desk LEDs"));
    try {
      setTitleColour("white");
      setColour("rgb(" + cache.red + ", " + cache.green + ", " + cache.blue + ")");
    } catch (error) {
      setTitleColour("orangered");
      setColour("rgb(" + 0 + ", " + 0 + ", " + 0 + ")");
      this.setState({ colour: "rgb(" + 0 + ", " + 0 + ", " + 0 + ")" });
    }
  };

  const colourUpdate = (rgb) => {
    var cache = JSON.parse(localStorage.getItem("Desk LEDs"));

    this.setState({ colour: rgb });

    var a = rgb.split("(")[1].split(")")[0];
    a = a.split(",");
    var colours = a.map(function (x) {
      return parseInt(x);
    });

    console.log(colours);

    apiPost("/api/deskLEDs/Update", {
      red: colours[0],
      green: colours[1],
      blue: colours[2],
    });
  };

  return (
    <Container css={deskLEDsModule}>
      <div css={deskLEDsTitle}>
        <h2 style={{ color: titleColour }}>Desk LEDs</h2>
      </div>

      <div css={deskLEDsColourWheel}>
        <ColourWheel
          name={"Canvas 1"}
          radius={125}
          padding={10}
          lineWidth={40}
          onColourSelected={(rgb) => colourUpdate(rgb)}
          spacers={{
            colour: "whitesmoke",
            shadowColour: "grey",
            shadowBlur: 0,
          }}
          // onRef={(ref) => (setColourWheel(ref))}
          preset
          presetColour={colour}
          animated
        />
      </div>
    </Container>
  );
};

export default DeskLEDs;

const deskLEDsModule = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 325px;
  width: 325px;
  top: 55%;
  left: 20%;

  border-radius: 20px;

  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(50, 50, 50, 0.1);
  color: white;
  font-family: "Arial";
  font-size: 25px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const deskLEDsTitle = css`
  position: absolute;
  transform: translate(-50%, -50%);
  width: 100%;
  top: 35px;
  left: 50%;
`;

const deskLEDsColourWheel = css`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 190px;
  left: 50%;
`;

// Radius    - Overall Size
// Padding   - White Line Width
// LineWidth - Colour tile thickness
// Middle is drawn behind everything

// All these variables depend on each other so it takes a while to tune
