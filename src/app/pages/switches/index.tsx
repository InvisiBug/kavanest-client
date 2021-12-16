import React from "react";
import { PageTitle } from "../../atoms";

const Switches: React.FC<any> = ({ name, close = null }) => {
  return (
    <>
      <div>
        <PageTitle>Welcome to the swtiches screen</PageTitle>
      </div>
    </>
  );
};

export default Switches;
export interface Props {}
