import React, { useState } from "react";
import RequestButton from "./components/requestButton";
import { AxiosResponse } from "axios";
import ResponseBox from "./components/responseBox";

const App: React.FC = () => {
  const [data, setData] = useState<AxiosResponse | null | void>(null);

  return (
    <>
      <div style={{ height: "100vh", width: "100vw", backgroundColor: "#343434", display: "inline-block" }}>
        <RequestButton setData={setData} />
        <ResponseBox data={data} />
      </div>
    </>
  );
};

export default App;
