import { FC } from "react";
import styled from "@emotion/styled";

//* RGB indicator shaped like the standard indicator dot
//* Args
//** Red, Green, Blue
const RGBStateIndicator: FC<Props> = ({ red, green, blue, connected, size = "large" }) => {
  return (
    <>
      <RGBIndicator red={red} green={green} blue={blue} size={size} connected={connected} />
    </>
  );
};

export default RGBStateIndicator;

interface Props {
  red: number;
  green: number;
  blue: number;
  connected?: boolean;
  size?: "large" | "small";
}

const RGBIndicator = styled.div<Props>`
  height: ${({ size }) => (size === "large" ? "2rem" : size === "small" ? "1rem" : null)};
  width: ${({ size }) => (size === "large" ? "2rem" : size === "small" ? "1rem" : null)};
  border-radius: 1rem;
  margin-right: 1rem;
  background-color: ${(props) => `rgba(${props.red},${props.green},${props.blue})`};
`;
