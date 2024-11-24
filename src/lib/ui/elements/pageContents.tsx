import { FC, ReactNode } from "react";
import styled from "@emotion/styled";

const PageContents: FC<Props> = ({ children }) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};

export default PageContents;

interface Props {
  children: ReactNode;
}

const Container = styled.div`
  & > *:first-of-type {
    border-top: 1px solid grey;
    margin-top: 50px;
  }
  /* border: 1px solid red; */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
