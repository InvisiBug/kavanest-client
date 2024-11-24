import { useState, useEffect, memo } from "react";
import styled from "@emotion/styled";
import { gql, useMutation } from "@apollo/client";
import { Selector, BooleanStateIndicator } from "@/lib/ui";
import { useAppContext } from "@/lib/context";
import { Plug } from "@/lib/gqlTypes";
import { mq, px } from "@/lib/mediaQueries";

// This version handles the socket updates in this component
// The other versions parent handles the data

const PlugSelector: React.FC<Props> = ({ data, mqttNameOverride = null, margin = false }) => {
  const { socket } = useAppContext();
  const [updatePlug] = useMutation(mutation, {});

  const [{ name, state, connected, _id }, setPlugData] = useState<Plug>(data);

  useEffect(() => {
    if (_id) {
      socket.on(_id, (payload: any) => {
        setPlugData(payload);
      });
    }

    return () => {
      socket.off(_id);
    };
  }, [_id, socket]);

  return (
    <>
      <Container>
        <Selector
          name={name}
          connected={connected}
          onClick={() =>
            updatePlug({
              variables: {
                input: {
                  name: name,
                  state: !state,
                },
              },
            })
          }
        >
          <BooleanStateIndicator state={state} connected={connected} size={"large"} margin={margin} />
        </Selector>
      </Container>
    </>
  );
};

export default memo(PlugSelector);

interface Props {
  data: Plug;
  mqttNameOverride?: string;
  margin?: boolean;
}

const mutation = gql`
  mutation ($input: PlugInput) {
    updatePlug(input: $input) {
      name
      state
      connected
    }
  }
`;

const borders = false;

const Container = styled.div`
  border: ${borders ? "1px solid green" : null};
  color: white;
  border-bottom: 1px solid grey;

  display: flex;
  flex-direction: column;
  margin: auto;
`;
