import React from "react";
import { Sensors, Setpoints } from "./components";
import { Layout } from "./lib";
import { AppProvider } from "./utils";
import Screens from "./components/screens";

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <Layout>
          <Screens />
          {/* <Sensors /> */}
          {/* <Setpoints /> */}
        </Layout>
      </AppProvider>
    </>
  );
};

export default App;
