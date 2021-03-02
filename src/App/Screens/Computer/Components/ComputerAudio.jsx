/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { apiPost } from "../../../../Helpers/fetch";

// Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Buttons
import OnButton from "../../../Helpers/On Button";
import OffButton from "../../../Helpers/Off Button";

const Container = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 450px;
  width: 350px;
  top: 44.5%;
  left: 65%;

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
    apiPost("/api/ComputerAudio/Off", { device: device });
  };

  const powerOn = (device) => {
    apiPost("/api/ComputerAudio/On", { device: device });
  };
  //className="computerAudioModule"

  return (
    <>
      <Container style={{ left: "50%", top: "55%" }}>
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
              <OffButton
                name="Off"
                index={0}
                isActive={!deviceData.left || !deviceData.right || !deviceData.sub || !deviceData.mixer}
                onClick={() => powerOff("master")}
              />
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <OnButton
                name="On"
                index={1}
                isActive={deviceData.left & deviceData.right & deviceData.sub & deviceData.mixer}
                onClick={() => powerOn("master")}
              />
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
              <OffButton name="Off" index={0} isActive={!deviceData.left} onClick={() => powerOff("left")} />
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <OnButton name="On" index={1} isActive={deviceData.left} onClick={() => powerOn("left")} />
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
              <OffButton name="Off" index={0} isActive={!deviceData.right} onClick={() => powerOff("right")} />
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <OnButton name="On" index={1} isActive={deviceData.right} onClick={() => powerOn("right")} />
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
              <OffButton name="Off" index={0} isActive={!deviceData.sub} onClick={() => powerOff("sub")} />
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <OnButton name="On" index={1} isActive={deviceData.sub} onClick={() => powerOn("sub")} />
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
              <OffButton name="Off" index={0} isActive={!deviceData.mixer} onClick={() => powerOff("mixer")} />
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <OnButton name="On" index={1} isActive={deviceData.mixer} onClick={() => powerOn("mixer")} />
            </Col>
          </Row>
        </Buttons>
      </Container>
    </>
  );
};

export default ComputerAudio;
