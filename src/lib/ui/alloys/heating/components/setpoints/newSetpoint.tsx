import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { plus, cancel } from "@/lib/ui";
import { mq } from "@/lib/mediaQueries";
import OverrideType from "@/lib/ui/elements/overrideTypeSelector";

const NewSetpoint: React.FC<Props> = ({ close, room, day }) => {
  const [mins, setMins] = useState<string | null>("00");
  const [hours, setHours] = useState<string | null>("00");
  const [temp, setTemp] = useState<string>("0");
  const [overrideType, setOverrideType] = useState("");

  const [addSetpoint] = useMutation(addSetpointMutation, {
    onCompleted() {
      close();
    },
  });

  const updateType = (type: string) => {
    console.log("🚀 ~ type:", type);
    setOverrideType(type);
  };

  // move to next input when max length is reached
  // https://linguinecode.com/post/focus-next-input-in-react
  return (
    <>
      <Container>
        <Time>
          <MyInput
            type="text"
            name="field-1"
            placeholder="00"
            inputMode="decimal"
            maxLength={2}
            onChange={(event) => {
              setHours(("0" + event.target.value).slice(-2));
            }}
          />
          :
          <MyInput
            type="text"
            name="field-2"
            placeholder="00"
            inputMode="decimal"
            onChange={(event) => setMins(("0" + event.target.value).slice(-2))}
          />
        </Time>

        <Temp>
          <MyInput type="text" name="field-3" placeholder="00" inputMode="decimal" onChange={(event) => setTemp(event.target.value)} />
          °C
        </Temp>

        {/* </form> */}

        <OverrideType currentType={overrideType} types={["on", "off", "passive"]} updateType={updateType} />

        <Cancel src={cancel} onClick={close} />
        <Accept
          src={plus}
          onClick={() => {
            addSetpoint({
              variables: {
                input: {
                  name: room,
                  setpoints: {
                    day: day,
                    time: `${hours}:${mins}`,
                    values: {
                      temp: parseFloat(temp),
                      type: overrideType,
                    },
                  },
                },
              },
            });
          }}
        />
      </Container>
    </>
  );
};

interface Props {
  close: () => void;
  room: string;
  day: string;
}

export default NewSetpoint;

const addSetpointMutation = gql`
  mutation UpdateRoom($input: RoomInput) {
    room: updateRoom(input: $input) {
      name
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
  width: 75%;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  border: ${borders ? "1px solid red" : null};
  ${mq("large")} {
    border: ${borders ? "1px solid purple" : null};
    /* max-width: 25%; */
    width: 95%;
    /* width: 75%; */
  }
`;

const MyInput = styled.input`
  text-align: center;
  font-size: 1.2rem;
  width: 1.3rem;
  color: white;
  background-color: rgba(255, 255, 255, 0);
  border: ${borders ? "1px solid white" : "none"};
  /* margin: 0; */
`;

const Time = styled.div`
  border: ${borders ? "1px solid orange" : null};
  font-size: 1.2rem;
  margin: 0;
  /* transform: translateX(-2px); */
`;

const Temp = styled.div`
  border: ${borders ? "1px solid orange" : null};
  font-size: 1.2rem;
  margin: 0;
`;
