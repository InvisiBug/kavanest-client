import React from "react";
import { Sensors, Setpoints } from "./components";
import { Layout } from "./lib";
import { AppProvider } from "./utils";

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <Layout>
          <Sensors />
          <Setpoints />
        </Layout>
      </AppProvider>
    </>
  );
};

export default App;
