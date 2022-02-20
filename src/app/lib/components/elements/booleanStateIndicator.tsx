import React, { FC } from "react";
import styled from "@emotion/styled";
import { on, off, disconnected } from "../../";

const BooleanStateIndicator: FC<Props> = ({ state, connected, size = "large", margin = false }) => {
  return (
    <>
      <StateIndicator state={state} connected={connected} size={size} margin={margin} />
    </>
  );
};

export default BooleanStateIndicator;

const StateIndicator = styled.div`
  height: ${(props: Props) => (props.size === "large" ? "2rem" : props.size === "small" ? "1rem" : null)};
  width: ${(props: Props) => (props.size === "large" ? "2rem" : props.size === "small" ? "1rem" : null)};
  /* height: 1rem; */
  /* width: 1rem; */
  border-radius: 1rem;
  /* margin-right: 1.55rem; */
  margin-right: ${(props: Props) => (props.margin ? "2.24rem" : "1rem")};
  background-color: ${(props: Props) => (props.connected ? (props.state ? on : off) : disconnected)};
`;

interface Props {
  state: boolean;
  connected: boolean;
  margin?: boolean;
  size: "large" | "small";
}
