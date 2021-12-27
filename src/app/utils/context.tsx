import React, { createContext, useContext, useState } from "react";
import openSocket, { Socket } from "socket.io-client";
import { socketUrl } from "./index";

const AppContext = createContext<ContextState | undefined>(undefined);

export const AppProvider: React.FC<Props> = ({ children }) => {
  const socket = openSocket(socketUrl);

  const [screen, setScreen] = useState("plugs");

  const [openPlug, setOpenPlug] = useState("");
  const [openSensor, setOpenSensor] = useState("");

  return (
    <>
      <AppContext.Provider
        value={{
          openPlug,
          setOpenPlug,

          openSensor,
          setOpenSensor,

          screen,
          setScreen,

          socket,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};

export function useAppContext(): ContextState {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useConfigContext must be rendered in a tree within a ConfigContextProvider");
  }
  return context;
}

export default AppContext;

interface Props {}

interface ContextState {
  screen: string;
  setScreen: (key: string) => void;

  openPlug: string;
  setOpenPlug: (key: string) => void;

  openSensor: string;
  setOpenSensor: (key: string) => void;

  socket: Socket;
}
