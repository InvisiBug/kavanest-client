import React from "react";
import { Layout } from "./app/lib/templates";
import { AppProvider } from "./app/utils";
import Screens from "./app/";

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <Layout>
          <Screens />
        </Layout>
      </AppProvider>
    </>
  );
};

export default App;
