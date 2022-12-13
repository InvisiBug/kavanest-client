import React, { FC, useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { getCurrentSetpointV2 } from "src/lib/api";
import { decamelize } from "src/lib/helpers";
import { useAppContext } from "src/lib/context";
import { flame, Override } from "src/lib/components";
import SetpointList from "./setpointList";
// import OverrideControls from "../../../../lib/components/alloys/heating/heatingOverride/overrideControls";
import { useNavigate, useLocation } from "react-router-dom";

const RoomSetpoints: FC<Props> = ({ name, close }) => {
  const [deadzoneVal, setDeadzoneVal] = useState<string>("");
  const [offsetVal, setOffsetVal] = useState<string>("");

  const { socket } = useAppContext();
  const navigate = useNavigate();

  // Socket updatable data
  const [sensor, setSensor] = useState<any>();
  const [radiator, setRadiator] = useState<any>();
  const [heating, setHeating] = useState<any>();

  const { data, refetch } = useQuery<GqlResponse>(request, {
    variables: { room: name },
    fetchPolicy: "no-cache",
    onCompleted() {
      setSensor(data?.sensor);
      setRadiator(data?.radiator);
      setHeating(data?.heating);

      socket.on(data?.sensor?._id || "", (payload: any) => {
        setSensor(payload);
      });

      socket.on(data?.radiator?._id || "", (payload: any) => {
        setRadiator(payload);
      });

      socket.on(data?.heating?._id || "", (payload: any) => {
        setHeating(payload);
      });
    },
  });

  useEffect(() => {
    return function cleanup() {
      socket.removeAllListeners();
    };
  }, []); // eslint-disable-line

  const [updateDeadzone] = useMutation(deadzoneMutation, {});
  const [updateOffset] = useMutation(offsetMutation, {});

  const currentLocation = useLocation().pathname.replace("/", "").split("/")[0];
  if (!data || !heating || !radiator) return <></>;

  const target = data.room?.setpoints || "";
  const deadzone = data.room?.deadzone || 0;
  const offset = data.sensor?.offset || 0;

  return (
    <>
      <PageTitle
        onClick={() => {
          // close
          navigate(-1);
          console.log(currentLocation);
        }}
      >
        <TitleText>&larr; {decamelize(name)}</TitleText>
      </PageTitle>
      <Info>
        <Left>
          <CurrentTemp>
            Current <br />
            {`${sensor?.temperature}°C`}
          </CurrentTemp>

          <Target>
            Target
            <br /> {getCurrentSetpointV2(target)![1] > 5 ? `${getCurrentSetpointV2(target)![1]}°C` : "Off"}
          </Target>
        </Left>

        {heating.state && !radiator.valve ? <FlameIcon src={flame} /> : null}

        <Right>
          <Offset>
            Offset <br />
            <MyInput
              type="text"
              placeholder={`${offset}°C`}
              inputMode="decimal"
              onChange={(event) => {
                setOffsetVal(event.target.value);
              }}
              onBlur={() => {
                updateOffset({ variables: { input: { room: name, offset: parseFloat(offsetVal) } } });
                refetch();
              }}
            />
          </Offset>
          <Deadzone>
            Deadzone <br />
            <MyInput
              type="text"
              placeholder={`${deadzone}°C`}
              inputMode="decimal"
              onChange={(event) => {
                setDeadzoneVal(event.target.value);
              }}
              onBlur={() => {
                updateDeadzone({ variables: { input: { name: name, deadzone: deadzoneVal } } });
                refetch();
              }}
            />
          </Deadzone>
        </Right>
      </Info>
      {/* <Override room={name} /> */}
      <SetpointList room={name} data={data} refreshPage={() => refetch()} />
    </>
  );
};

export default RoomSetpoints;
export interface Props {
  name: string;
  close?: () => void;
}

const request = gql`
  query GetSetpoints($room: String) {
    room: getRoom(name: $room) {
      name
      demand
      deadzone
      setpoints {
        weekend
        weekday
      }
    }
    radiator: getRadiator(name: $room) {
      name
      valve
      connected
      _id
    }
    sensor: getSensor(room: $room) {
      room
      temperature
      offset
      _id
    }
    heating: getPlug(name: "heating") {
      name
      state
      connected
      _id
    }
  }
`;

type GqlResponse = {
  room: {
    name: string;
    demand: number;
    deadzone: number;
    setpoints: {
      weekend?: string;
      weekday?: string;
    };
  };
  radiator: {
    name: string;
    valve: boolean;
    connected: boolean;
    _id: string;
  };
  sensor: {
    room: string;
    temperature: number;
    offset: number;
    _id: string;
  };
  heating: {
    name: string;
    state: boolean;
    connected: boolean;
    _id: string;
  };
};

const deadzoneMutation = gql`
  mutation ($input: RoomInput) {
    updateRoom(input: $input) {
      name
      deadzone
    }
  }
`;

const offsetMutation = gql`
  mutation UpdateOffset($input: offsetsInput) {
    updateOffset(input: $input) {
      room
    }
  }
`;

const borders: boolean = false;

const PageTitle = styled.div`
  cursor: pointer;
`;

const TitleText = styled.h1`
  border: ${borders ? "1px solid green" : "none"};
  border-bottom: 1px solid grey;
  padding-bottom: 5px; // Required
  margin-bottom: 0;
`;

const Info = styled.div`
  border: ${borders ? "1px solid purple" : "none"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid grey;
`;

const Left = styled.div`
  border: ${borders ? "1px solid white" : "none"};
  margin: 0.5rem 1.5rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Target = styled.div`
  border: ${borders ? "1px solid white" : "none"};
  font-size: 1.2rem;
  text-align: center;
`;

const CurrentTemp = styled.div`
  border: ${borders ? "1px solid white" : "none"};
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const FlameIcon = styled.img`
  border: ${borders ? "1px solid brown" : "none"};
  height: 35px;
`;

const Right = styled.div`
  font-size: 1.2rem;
  margin-right: 1.5rem;
  text-align: center;
`;

const Offset = styled.div`
  border: ${borders ? "1px solid orangered" : "none"};
  margin-bottom: 1.5rem;
`;

const Deadzone = styled.div`
  border: ${borders ? "1px solid yellow" : "none"};
`;

const MyInput = styled.input`
  text-align: center;
  font-size: 1.2rem;
  width: 100px;
  color: red;
  background-color: rgba(255, 255, 255, 0);
  border: ${borders ? "1px solid white" : "none"};
  margin: 0;
  ::placeholder {
    color: white;
  }
`;
