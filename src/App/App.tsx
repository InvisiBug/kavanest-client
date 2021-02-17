/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import NavBar from "./NavBar/NavBar";
import { jsx, css } from "@emotion/react";

// // Modules
// import DateBox from "./Ui Library/Date and Time";
// import Dots from "./Ui Library/Dots";

// // Screens
// import Lights from "./Screens/Lights/LightsScreen.jsx";
// import Computer from "./Screens/Computer/ComputerScreen.jsx";
// import Climate from "./Screens/Climate/ClimateScreen.jsx";
// import Heating from "./Screens/Heating/HeatingScreen.jsx";
// import Logger from "./Screens/MQTT/MqttLogger";
// import Diagnostics from "./Screens/Diagnostics/DiagnosticsScreen";

// // Cache Loader
// // import TemperatureGraphsDataCollector from "./Cache Loaders/TemperatureGraphsDataCollector";
// import Socket from "./Interfaces/Socket";
import backgroundImage from "../App/Backgrounds/Red.jpg";
// import { useState } from "react";
// import MobileSite from "./MobileSite/MobileSite.jsx";

const background = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  top: 50%;
  left: 50%;

  background: url(${backgroundImage});

  background-repeat: no-repeat;
  background-size: cover;
`;

const windowContainer = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  top: 50%;
  left: 50%;

  display: flex;
`;

const navBar = css`
  height: 100%;
  width: 10%;
  max-width: 120px;

  background: rgba(255, 255, 255, 0.05);
  border-right: 1px solid grey;
`;

// const screenContainer = css`
//   position: relative;
//   height: 100%;
//   flex-grow: 1;
// `;

// const dots = css`
//   position: absolute;
//   transform: translate(-50%, -50%);
//   background-color: green;
// `;

const App = () => {
  const [screen, setScreen] = useState(
    JSON.parse(`${localStorage.getItem("screen")}`)
  );
  // const [mobile, setMobile] = useState(navigator.appVersion.search("Android") > 0);
  // const changeScreen = (newScreen) => {
  //   setScreen(newScreen);
  //   localStorage.setItem("screen", '"' + newScreen + '"');
  // };
  // return <h1>Hello</h1>;

  return (
    <>
      <div css={background} />

      <div css={windowContainer}>
        <NavBar
          style={navBar}
          changeScreen={() => console.log("")}
          screen={screen}
        />
      </div>
    </>
  );
};

interface Props {
  message: string;
}

const MyMessage: React.FC<Props> = ({ message }) => {
  // const MyMessage = ({ message }) => {
  return (
    <>
      <h1>i shall speak! my message is: {message}</h1>
    </>
  );
};

export default App;

// {/* <Socket />

// <div css={background} />
// {mobile ? (
//   <div css={windowContainer}>
//     <MobileSite />
//   </div>
// ) : (
//   <>
//     <div css={windowContainer}>
//       <NavBar style={navBar} changeScreen={changeScreen} screen={screen} />

//       <div css={screenContainer}>
//         <DateBox />

//         {screen === "Computer" ? (
//           <Computer />
//         ) : screen === "Lights" ? (
//           <Lights />
//         ) : screen === "Climate" ? (
//           <Climate />
//         ) : screen === "Heating" ? (
//           <Heating />
//         ) : screen === "MQTT" ? (
//           <Logger />
//         ) : screen === "Diagnostics" ? (
//           <Diagnostics />
//         ) : null}
//       </div>
//     </div>
//   </>
// )} */}
