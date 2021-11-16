import React from "react";
import Boop from "./components/plugs";
import Test from "./components/queryTest";

const App: React.FC = () => {
  return (
    <>
      <div style={{ height: "100vh", width: "100%", backgroundColor: "#2c2c2c" }}>
        <Boop />
        {/* <Test /> */}
      </div>
    </>
  );
};

export default App;
