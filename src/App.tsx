import React, { useState } from "react";
import MakeRequest from "./components/requestButton";
import { AxiosResponse } from "axios";
import ResponseBox from "./components/responseBox";

const App: React.FC = () => {
  const [data, setData] = useState<AxiosResponse | null | void>(null);

  return (
    <>
      <div style={{ height: "100vh", width: "100%", backgroundColor: "#2c2c2c" }}>
        <MakeRequest setData={setData} />
        <ResponseBox data={data} />
      </div>
    </>
  );
};

export default App;
