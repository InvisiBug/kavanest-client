import { useEffect, memo } from "react";
import styled from "@emotion/styled";
import { gql, useMutation } from "@apollo/client";
import { Selector, BooleanStateIndicator } from "@/lib/ui";
import { useAppContext } from "@/lib/context";

const PlugSelector: React.FC<Props> = ({ thisPlug, mqttNameOverride = null, socketUpdate = () => null, margin = true }) => {
  const { socket } = useAppContext();
  const [updatePlug] = useMutation(mutation, {});

  const { name, state, connected, _id } = thisPlug;

  useEffect(() => {
    if (_id) {
      socket.on(_id, (payload: any) => {
        socketUpdate(_id, payload);
      });
    }

    return () => {
      socket.off(_id);
    };
  }, [socketUpdate, _id, socket]);

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
                  name: mqttNameOverride ? mqttNameOverride : name,
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

export interface Props {
  thisPlug: PlugData;
  mqttNameOverride?: string;
  socketUpdate?: any;
  openDetails?: string;
  margin?: boolean;
  setOpenDetails?: (key: string) => void;
}

export interface PlugData {
  name: string;
  state: boolean;
  connected: boolean;
  _id: string;
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
