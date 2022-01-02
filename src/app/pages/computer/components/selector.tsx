import React, { FC, Fragment, useState } from "react";
import styled from "@emotion/styled";
import { downArrow, rightArrow, Room } from "../../../lib";
import { decamelize } from "../../../utils";
import Details from "./Details";

const Selector: FC<Props> = ({ data }) => {
  const [details, setDetails] = useState<boolean>(false);
  const { name } = data;

  return (
    <>
      <Container>
        <Header onClick={() => setDetails(!details)}>
          <Room connected={true}>{decamelize(name)}</Room>
          <Icon src={details ? downArrow : rightArrow} />
        </Header>
        {details ? <Details data={data} /> : null}
      </Container>
    </>
  );
};

export default Selector;

interface Props {
  data: {
    name: string;
    left: boolean;
    right: boolean;
    sub: boolean;
    mixer: boolean;
  };
}

const Container = styled.div`
  color: white;
  border-bottom: 1px solid grey;

  & > *:first-of-type {
    border-top: 1px solid grey;
  }

  display: flex;
  flex-direction: column;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin: auto;
  justify-content: space-around;
  min-height: 0px;
  cursor: pointer;
`;

const Icon = styled.img`
  height: 20px;
`;
