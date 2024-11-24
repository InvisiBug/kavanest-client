import { FC } from "react";
import { switchOn, switchOff } from "@/lib/ui";
import { decamelize } from "@/lib/helpers";
import styled from "@emotion/styled";

const Details: FC<Props> = ({ data, buttonClicked }) => {
  const { left, right, sub, mixer } = data;
  let master;

  if (left && right && sub && mixer) {
    master = true;
  } else {
    master = false;
  }

  const relays: any = { master, left, right, sub, mixer };

  return (
    <>
      <Container>
        {Object.keys(relays).map((relay: any) => {
          return (
            <Row key={Math.random()}>
              <Left>
                <Name>
                  <Text>{decamelize(relay)}</Text>
                </Name>
              </Left>
              <Right>
                <Icon src={relays[relay] ? switchOn : switchOff} onClick={() => buttonClicked(relay)} />
              </Right>
            </Row>
          );
        })}
      </Container>
    </>
  );
};

export default Details;

interface Props {
  data: {
    left: boolean;
    right: boolean;
    sub: boolean;
    mixer: boolean;
  };
  buttonClicked: any;
}

const borders: boolean = false;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const Row = styled.div`
  border: ${borders ? "1px solid white" : "none"};
  display: flex;
  justify-content: space-around;
  margin: auto;

  width: 75%;
  -webkit-tap-highlight-color: transparent;
`;

const Name = styled.div`
  border: ${borders ? "1px solid red" : "none"};
`;

const Left = styled.div`
  border: ${borders ? "1px solid purple" : "none"};
  display: flex;
  justify-content: center;
  width: 50%;
`;
const Right = styled.div`
  border: ${borders ? "1px solid blue" : "none"};
  display: flex;
  justify-content: center;
  width: 50%;
`;

const Icon = styled.img`
  border: ${borders ? "1px solid orange" : "none"};
  height: 4rem;
  width: 4rem;
`;

const Text = styled.p`
  border: ${borders ? "1px solid white" : "none"};
  font-size: 1.2rem;
`;
