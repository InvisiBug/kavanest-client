import React, { FC } from "react";
import styled from "@emotion/styled";
import { decamelize } from "src/lib/helpers";
import { useNavigate } from "react-router-dom";
import { SelectorTitle, useHeating } from "src/lib/components";

const Title: FC = () => {
  const { name, borders } = useHeating();
  const navigate = useNavigate();

  return (
    <PageTitle onClick={() => navigate(-1)}>
      <TitleText borders={borders}>&larr; {decamelize(name)}</TitleText>
      {/* <SelectorTitle> {decamelize(name)}</SelectorTitle> */}
    </PageTitle>
  );
};

export default Title;

const PageTitle = styled.div`
  cursor: pointer;
  grid-area: title;
`;

const TitleText = styled.h1`
  border: ${({ borders }: { borders: boolean }) => (borders ? "1px solid green" : "none")};
  border-bottom: 1px solid grey;
  padding-bottom: 5px; // Required
  margin-bottom: 0;
`;
