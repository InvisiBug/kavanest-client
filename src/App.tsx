import React from "react";
import { Sensors, Setpoints } from "./components";
import { Layout } from "./lib";

const App: React.FC = () => {
  return (
    <>
      <Layout>
        test
        <Sensors />
        <Setpoints />
      </Layout>
    </>
  );
};

export default App;
