import React, { createContext, useContext, useState } from "react";

const AppContext = createContext<ContextState | undefined>(undefined);

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [test, setTest] = useState("Test");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [arr, setArr] = useState(["hello", "me"]);

  return (
    <>
      <AppContext.Provider value={{ test, setTest, username, setUsername, password, setPassword, arr, setArr }}>{children}</AppContext.Provider>
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
}
