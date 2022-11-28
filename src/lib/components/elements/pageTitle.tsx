import React from "react";
import styled from "@emotion/styled";

const PageTitle: React.FC<Props> = ({ children, desc = null }) => {
  return (
    <>
      <Container>
        <TitleText>{children}</TitleText>
        {desc ? <DescriptionText>{desc}</DescriptionText> : null}
      </Container>
    </>
  );
};

export default PageTitle;

interface Props {
  children: string;
  desc?: string;
}

const Container = styled.div`
  /* border: 1px solid red; */
  margin-bottom: 1rem;

  /* margin-bottom: 0px; */
`;
const TitleText = styled.h1`
  margin-bottom: 0px;

  /* font-size: 1.5rem; */
`;

const DescriptionText = styled.p`
  margin-top: 5px;
  font-size: 1rem;
`;
