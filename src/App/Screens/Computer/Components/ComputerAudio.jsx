/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { apiPost } from "../../../../Helpers/fetch";

// Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Buttons
import Button from "../../../Ui Library/Button";
import { onColour, offColour } from "../../../Ui Library/Constants";

const Container = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 425px;
  width: 350px;
  top: 50%;
  left: 50%;

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

const Buttons = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 300px;
  width: 75%;
  top: 50%;
  left: 50%;
`;
const Title = styled.h3`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 8%;
  left: 50%;
  color: white;
  width: 100%;
`;

const ComputerAudio = () => {
  const [deviceData, setDeviceData] = useState(JSON.parse(localStorage.getItem("Computer Audio")));

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(JSON.parse(localStorage.getItem("Computer Audio")));
    }, 100);
    return () => clearTimeout(timer);
  }, [deviceData]);

  const powerOff = (device) => {
    apiPost("/api/ComputerAudio", {
      state: "off",
      device: device,
    });
  };

  const powerOn = (device) => {
    apiPost("/api/ComputerAudio", {
      state: "on",
      device: device,
    });
  };

  return (
    <>
      <Container>
        <Title>Computer Audio</Title>

        <Buttons>
          <Row style={{ height: "65px" }}>
            <Col
              md={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "Center",
              }}
            >
              <h4> Master Power </h4>
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <Button
                isActive={!deviceData.left || !deviceData.right || !deviceData.sub || !deviceData.mixer}
                activeColour={offColour}
                handleClick={() => powerOff("master")}
              >
                Off
              </Button>
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <Button
                isActive={deviceData.left & deviceData.right & deviceData.sub & deviceData.mixer}
                activeColour={onColour}
                handleClick={() => powerOn("master")}
              >
                On
              </Button>
            </Col>
          </Row>

          <Row style={{ height: "65px" }}>
            <Col
              md={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "Center",
              }}
            >
              <h5> Left Speaker </h5>
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <Button isActive={!deviceData.left} activeColour={offColour} handleClick={() => powerOff("left")}>
                Off
              </Button>
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <Button isActive={deviceData.left} activeColour={onColour} handleClick={() => powerOn("left")}>
                On
              </Button>
            </Col>
          </Row>

          <Row style={{ height: "65px" }}>
            <Col
              md={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "Center",
              }}
            >
              <h5> Right Speaker </h5>
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <Button isActive={!deviceData.right} activeColour={offColour} handleClick={() => powerOff("right")}>
                Off
              </Button>
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <Button isActive={deviceData.right} activeColour={onColour} handleClick={() => powerOn("right")}>
                On
              </Button>
            </Col>
          </Row>

          <Row style={{ height: "65px" }}>
            <Col
              md={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "Center",
              }}
            >
              <h5> Sub </h5>
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <Button isActive={!deviceData.sub} activeColour={offColour} handleClick={() => powerOff("sub")}>
                Off
              </Button>
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <Button isActive={deviceData.sub} activeColour={onColour} handleClick={() => powerOn("sub")}>
                On
              </Button>
            </Col>
          </Row>

          <Row style={{ height: "65px" }}>
            <Col
              md={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "Center",
              }}
            >
              <h5> Mixer </h5>
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <Button isActive={!deviceData.mixer} activeColour={offColour} handleClick={() => powerOff("mixer")}>
                Off
              </Button>
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <Button isActive={deviceData.mixer} activeColour={onColour} handleClick={() => powerOn("mixer")}>
                On
              </Button>
            </Col>
          </Row>
        </Buttons>
      </Container>
    </>
  );
};

export default ComputerAudio;
