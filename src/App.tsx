import React from "react";
import { Layout } from "./app/lib";
import { AppProvider } from "./app/utils";
import Screens from "./app/pages";

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
