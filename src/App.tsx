import React, { useState } from "react";
import { AxiosResponse } from "axios";
import Sensors from "./components/Sensors";
import Setpoints from "./components/Setpoints";
import { Layout } from "./lib";

const App: React.FC = () => {
  return (
    <>
      <Layout>
        {/* <RequestButton setData={setData} /> */}
        <Sensors />
        <Setpoints />
      </Layout>
    </>
  );
};

export default App;
