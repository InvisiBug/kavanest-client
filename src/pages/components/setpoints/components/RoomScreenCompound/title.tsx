import React, { FC } from "react";
import styled from "@emotion/styled";
import { decamelize } from "src/lib/helpers";
import { useNavigate } from "react-router-dom";
import { useRoom } from "./room";

const Title: FC = () => {
  const { name } = useRoom();
  const navigate = useNavigate();

  return (
    <PageTitle onClick={() => navigate(-1)}>
      <TitleText>&larr; {decamelize(name)}</TitleText>
    </PageTitle>
  );
};

export default Title;

const borders = false;

const PageTitle = styled.div`
  cursor: pointer;
`;

const TitleText = styled.h1`
  border: ${borders ? "1px solid green" : "none"};
  border-bottom: 1px solid grey;
  padding-bottom: 5px; // Required
  margin-bottom: 0;
`;
