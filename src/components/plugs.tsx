import React, { useState } from "react";
import Axios, { AxiosResponse } from "axios";

const Boop: React.FC = () => {
  const [data, setData] = useState<AxiosResponse | null | void>(null);
  console.log(data);

  return (
    <>
      <button
        onClick={async () => {
          setData(await makeRequest());
        }}
      >
        Make request
      </button>

      {data && (
        <div style={{ color: "white" }}>
          <pre style={{ overflowWrap: "break-word" }}>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      {/* data?<pre>{data}</pre>: null */}
    </>
  );
};

export default Boop;

const test = () => {
  console.log("boop");
};

const makeRequest = async () => {
  // const url: string = "http://localhost:4000/";
  const url = "https://api.kavanet.io/";

  const test = await Axios.post(url, { query }).then((response) => {
    return response.data.data;
  });

  return test;
};

const query = `
  query GetPlugs {
    getPlugs {
      name
      state
      connected
    }
  }
`;
