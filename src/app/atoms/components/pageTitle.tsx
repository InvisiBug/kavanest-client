import React from "react";
import styled from "@emotion/styled";

const PageHeader: React.FC<Props> = ({ children, desc }) => {
  return (
    <>
      <TitleText>{children}</TitleText>
      <DescriptionText>{desc}</DescriptionText>
    </>
  );
};

export default PageHeader;

interface Props {
  children: string;
  desc: string;
}

const TitleText = styled.h1`
  margin-bottom: 0px;
  /* font-size: 1.5rem; */
`;

const DescriptionText = styled.p``;
