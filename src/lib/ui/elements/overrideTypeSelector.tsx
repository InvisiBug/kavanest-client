import { FC } from "react";
import styled from "@emotion/styled";
import { mq } from "@/lib/mediaQueries";

/*
  Generates a list of chips based on the types passed in.
  Styles the chips based on the current type.
  Calls the updateType function when a chip is clicked.

  @param currentType - The current type of the override.
  @param types - The list of types to generate chips for.
  @param updateType - The function to call when a chip is clicked with an arg for the chip type.
*/
const OverrideType: FC<any> = ({ currentType, types, updateType }) => {
  const typeToHuman = (type: string) => {
    const arr = type.split("-");

    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    return arr.join(" ");
  };

  return (
    <>
      <Container>
        {types.map((type: string, index: number) => {
          return (
            <Override key={index} onClick={() => updateType(type)} active={type === currentType}>
              {typeToHuman(type)}
            </Override>
          );
        })}
      </Container>
    </>
  );
};

export default OverrideType;

const borders = false;

const Container = styled.div`
  border: ${borders ? "1px solid purple" : "none"};
  /* margin-bottom: 1rem; */
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
`;

const Override = styled.div<OverrideProps>`
  border: ${({ active }) => (active ? "#c73528" : "#707070")};
  background-color: ${({ active }) => (active ? "#c73528" : "#707070")};
  padding: 0.5rem;
  font-size: 0.8rem;
  ${mq("large")} {
    font-size: 0%.9;
  }
  border-radius: 10% 10% 10% 10%;
  -webkit-tap-highlight-color: transparent;

  cursor: pointer;
`;

type OverrideProps = {
  active: boolean;
};
