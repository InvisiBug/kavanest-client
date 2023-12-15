import React, { FC } from "react";
import styled from "@emotion/styled";
import { decamelize } from "src/lib/helpers";
import { SelectorTitle, downArrow, rightArrow } from "src/lib/components";
import { mq, px } from "src/lib/mediaQueries";

const Selector: FC<Props> = ({ onClick, connected = true, openDetails, name, arrow = false, children }) => {
  return (
    <>
      <Frame
        onClick={() => {
          if (onClick) {
            onClick(openDetails === name ? "" : name);
          }
        }}
      >
        <SelectorTitle connected={connected}>{decamelize(name)}</SelectorTitle>
        {children}
        {arrow ? <Icon src={openDetails === name ? downArrow : rightArrow} /> : null}
        {/* {arrow ? <Icon src={openDetails === name ? downArrow : rightArrow} /> : <Blank />} */}
      </Frame>
    </>
  );
};

export default Selector;

interface Props {
  onClick?: any;
  connected?: boolean;
  openDetails?: string;
  arrow?: boolean;
  name: string;
  children: any;
}

const borders = false;

const Frame = styled.div`
  border: ${borders ? "1px solid white" : null};
  display: flex;
  width: 100%;
  align-items: center;
  margin: auto;
  justify-content: space-around;
  min-height: 0px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

// ${mq("large")} {
//   /* background-color: red; */
//   /* height: 200px; */
//   display: flex;

//   width: 200px;
//   flex-direction: column;
//   border: 1px solid red;
//   border-radius: 20px;
//   /* margin: 10px 100px 10px 100px; */
//   /* margin-bottom: 50px; */
//   /* background-color: orange; */
//   /* max-width: ${px("medium")}px; */
// }

const Icon = styled.img`
  border: ${borders ? "1px solid green" : null};
  height: 20px;
  min-width: 20px;
`;

const Blank = styled.div`
  border: ${borders ? "1px solid pink" : null};
  min-width: 20px;
  min-height: 20px;
`;
