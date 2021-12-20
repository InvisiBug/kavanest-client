import React, { useState } from "react";
import styled from "@emotion/styled";
import { useQuery, gql, useMutation } from "@apollo/client";
import { downArrow, rightArrow, Room, on, off, disconnected } from "../../../lib";
import { decamelize } from "../../../utils";
import Details from "./details";

const RoomSelector: React.FC<Props> = ({ plug: { name } }) => {
  const { loading, error, data, refetch } = useQuery(query, { variables: { name }, fetchPolicy: "no-cache" });
  const [updatePlug] = useMutation(mutation, {
    onCompleted() {
      refetch();
    },
  });
  const [details, setDetails] = useState<boolean>(false);

  if (loading) return <></>;
  if (error) return <></>;

  const {
    response: { state, connected },
  } = data;

  const click = () => {
    updatePlug({ variables: { input: { name: name, state: !state } } });
  };

  return (
    <>
      <Container>
        <Header onClick={() => setDetails(!details)}>
          <Room>{decamelize(name)}</Room>
          <StateIndicator state={state} connected={connected} />
          <Icon src={details ? downArrow : rightArrow} />
        </Header>
        {details ? (
          <div>
            <Details name={name} state={state} connected={connected} click={click} />
          </div>
        ) : null}
      </Container>
    </>
  );
};

export default RoomSelector;

export interface Props {
  plug: { name: string };
}

const query = gql`
  query ($name: String) {
    response: getPlug(name: $name) {
      connected
      state
    }
  }
`;

const mutation = gql`
  mutation ($input: PlugInput) {
    updatePlug(input: $input) {
      name
      state
      connected
    }
  }
`;

const Container = styled.div`
  color: white;
  border-bottom: 1px solid grey;
  :first-of-type {
    border-top: 1px solid grey;
    margin-top: 50px;
  }

  display: flex;
  flex-direction: column;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin: auto;
  justify-content: space-around;
  min-height: 0px;
  cursor: pointer;
`;

const Icon = styled.img`
  height: 20px;
`;

const StateIndicator = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 1rem;
  margin-right: 1rem;
  background-color: ${(props: { state: boolean; connected: boolean }) => (props.connected ? (props.state ? on : off) : disconnected)};
`;
