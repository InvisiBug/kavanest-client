import { FC } from "react";
import styled from "@emotion/styled";
import { decamelize } from "@/lib/helpers";
import { useNavigate } from "react-router-dom";
import { SelectorTitle, useHeating } from "@/lib/ui";

const Title: FC<Props> = ({ close }) => {
  const { name, borders } = useHeating();
  const navigate = useNavigate();

  return (
    <PageTitle onClick={() => close()}>
      <TitleText borders={borders}>&larr; {decamelize(name)}</TitleText>
      {/* <SelectorTitle> {decamelize(name)}</SelectorTitle> */}
    </PageTitle>
  );
};

export default Title;

export interface Props {
  close: () => void;
}

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
