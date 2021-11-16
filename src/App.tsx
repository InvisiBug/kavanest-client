import React, { useState } from "react";
import MakeRequest from "./components/requestButton";
import { AxiosResponse } from "axios";

const App: React.FC = () => {
  const [data, setData] = useState<AxiosResponse | null | void>(null);

  return (
    <>
      <div style={{ height: "100vh", width: "100%", backgroundColor: "#2c2c2c" }}>
        <MakeRequest setData={setData} />

        {data && (
          <div style={{ color: "white" }}>
            <pre style={{ overflowWrap: "break-word" }}>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
