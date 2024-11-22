import React, { FC } from "react";
import styled from "@emotion/styled";
import { on, off, disconnected } from "@/lib/components";

const BooleanStateIndicator: FC<Props> = ({ state, connected, size = "large", margin = false }) => {
  return (
    <>
      <StateIndicator state={state} connected={connected} size={size} margin={margin} />
    </>
  );
};

export default BooleanStateIndicator;

const StateIndicator = styled.div<Props>`
  height: ${({ size }) => (size === "large" ? "2rem" : size === "small" ? "1rem" : null)};
  width: ${({ size }) => (size === "large" ? "2rem" : size === "small" ? "1rem" : null)};
  /* height: 1rem; */
  /* width: 1rem; */
  border-radius: 1rem;
  /* margin-right: 1.55rem; */
  margin-right: ${(margin) => (margin ? "2.24rem" : "1rem")};
  background-color: ${({ connected, state }) => (connected ? (state ? on : off) : disconnected)};
`;

interface Props {
  state: boolean;
  connected: boolean;
  margin?: boolean;
  size: "large" | "small";
}
