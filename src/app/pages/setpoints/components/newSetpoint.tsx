import React, { useState } from "react";
import styled from "@emotion/styled";
import { plus, cancel } from "../../../lib";
import { gql, useMutation } from "@apollo/client";

const NewSetpoint: React.FC<Props> = ({ close, room }) => {
  const [mins, setMins] = useState<string | null>(null);
  const [hours, setHours] = useState<string | null>(null);
  const [temp, setTemp] = useState<string>("");

  const [addSetpoint] = useMutation(addSetpointMutation, {
    onCompleted() {
      close();
    },
  });

  return (
    <>
      <Container>
        {/* <form> */}
        <Time>
          <MyInput type="text" placeholder="00" inputMode="decimal" onChange={(event) => setHours(("0" + event.target.value).slice(-2))} />
          :
          <MyInput type="text" placeholder="00" inputMode="decimal" onChange={(event) => setMins(("0" + event.target.value).slice(-2))} />
        </Time>

        <Accept
          src={plus}
          onClick={() => {
            addSetpoint({
              variables: {
                input: {
                  room,
                  time: `${hours}:${mins}`,
                  temp,
                },
              },
            });
          }}
        />

        <Cancel src={cancel} onClick={close} />

        <Temp>
          <MyInput type="text" placeholder="00" inputMode="decimal" onChange={(event) => setTemp(event.target.value)} />
          °C
        </Temp>
        {/* </form> */}
      </Container>
    </>
  );
};

interface Props {
  close: () => void;
  room: string;
}

export default NewSetpoint;

const addSetpointMutation = gql`
  mutation ($input: SetpointInput) {
    response: updateSetpoint(input: $input) {
      room
      setpoints
    }
  }
`;

const borders: boolean = false;

const Accept = styled.img`
  height: 1.5rem;
`;

const Cancel = styled.img`
  height: 1.5rem;
`;

const Container = styled.div`
  display: flex;
  width: 50vw;
  justify-content: space-between;
  border: ${borders ? "1px solid red" : null};
`;

const MyInput = styled.input`
  font-size: 1.2rem;
  width: 20px;
  color: white;
  background-color: rgba(255, 255, 255, 0);
  border: ${borders ? "1px solid white" : "none"};
  margin: 0;
  /* width: 25px; */
`;

const Time = styled.div`
  border: ${borders ? "1px solid orange" : null};
  font-size: 1.2rem;
  margin: 0;
  transform: translateX(-2px);
`;

const Temp = styled.div`
  border: ${borders ? "1px solid orange" : null};
  font-size: 1.2rem;
  margin: 0;
`;
