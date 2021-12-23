import React, { createContext, useContext, useState } from "react";
import openSocket, { Socket } from "socket.io-client";

const AppContext = createContext<ContextState | undefined>(undefined);

export const AppProvider: React.FC<Props> = ({ children }) => {
  // const socket = openSocket("http://192.168.1.11:3100");
  const socket = openSocket("https://test.socket.kavanet.io");

  const [test, setTest] = useState("Test");

  const [screen, setScreen] = useState("plugs");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [openPlug, setOpenPlug] = useState("");

  const [arr, setArr] = useState(["hello", "me"]);

  return (
    <>
      <AppContext.Provider
        value={{
          test,
          setTest,

          username,
          setUsername,

          password,
          setPassword,

          arr,
          setArr,

          openPlug,
          setOpenPlug,

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
  test: string;
  setTest: (key: string) => void;

  username: string;
  setUsername: (key: string) => void;

  password: string;
  setPassword: (key: string) => void;

  arr: Array<any>;
  setArr: (key: any) => void;

  screen: string;
  setScreen: (key: string) => void;

  openPlug: string;
  setOpenPlug: (key: string) => void;

  socket: Socket;
}
