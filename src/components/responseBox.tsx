import React from "react";

const ResponseBox: React.FC<Props> = ({ data }) => {
  if (data) {
    return (
      <div style={{ color: "white" }}>
        <pre style={{ overflowWrap: "break-word" }}>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }

  return <></>;
};

export default ResponseBox;

export type Props = {
  data: any;
};
