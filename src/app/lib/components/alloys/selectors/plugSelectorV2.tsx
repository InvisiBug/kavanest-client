import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { gql, useMutation } from "@apollo/client";
import { Selector, BooleanStateIndicator } from "../../../";
import { useAppContext } from "../../../../utils";

const PlugSelector: React.FC<Props> = ({ data, margin = true }) => {
  const { socket } = useAppContext();
  const [updatePlug] = useMutation(mutation, {});

  const [plugData, setPlugData] = useState(data);

  const { name, state, connected, _id } = plugData;

  useEffect(() => {
    if (_id) {
      socket.on(_id, (payload: any) => {
        setPlugData(payload);
      });
    }

    return () => {
      socket.off(_id);
    };
  }, []); // eslint-disable-line

  return (
    <>
      <Container>
        <Selector name={name} connected={connected} onClick={() => updatePlug({ variables: { input: { name: name, state: !state } } })}>
          <BooleanStateIndicator state={state} connected={connected} size={"large"} margin={margin} />
        </Selector>
      </Container>
    </>
  );
};

export default React.memo(PlugSelector);

export interface Props {
  data: PlugData;
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
