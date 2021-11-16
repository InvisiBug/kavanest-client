import React from "react";

const Boop: React.FC = () => {
  return (
    <>
      <button
        onClick={() => {
          test();
        }}
      >
        boop
      </button>
    </>
  );
};

export default Boop;

const test = () => {
  console.log("boop");
};
