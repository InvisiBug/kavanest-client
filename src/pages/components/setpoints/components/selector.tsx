import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { getCurrentSetpointV2 } from "src/lib/api";
import { decamelize } from "src/lib/helpers";
import { rightArrow, flame } from "src/lib/components";
import { useQuery, gql } from "@apollo/client";
import { useAppContext } from "src/lib/context";
import { mq, px } from "src/lib/mediaQueries";

const Setpoints: React.FC<Props> = ({ roomName, onClick = null, close = null }) => {
  const [sensor, setSensor] = useState<any>();
  const [valve, setValve] = useState<any>();
  const [heating, setHeating] = useState<any>();

  const { socket } = useAppContext();

  const { data } = useQuery<QueryResponse>(query, {
    variables: { roomName },
    fetchPolicy: "no-cache",
    onCompleted() {
      setSensor(data?.sensor);
      setValve(data?.valve);
      setHeating(data?.heating);

      socket.on(data?.sensor?._id || "", (payload: any) => {
        setSensor(payload);
      });

      socket.on(data?.valve._id || "", (payload: any) => {
        setValve(payload);
      });

      socket.on(data?.heating._id || "", (payload: any) => {
        setHeating(payload);
      });
    },
  });

  useEffect(() => {
    return function cleanup() {
      socket.removeAllListeners();
    };
  }, []); // eslint-disable-line

  if (!data || !heating || !valve || !sensor) return <></>;

  let target: any;

  target = data?.setpoints?.setpoints;

  return (
    <>
      <Container onClick={onClick}>
        <RoomName connected={sensor.connected} onClick={close}>
          {decamelize(roomName)}
        </RoomName>
        {!valve.state && heating.state ? <FlameIcon src={flame}></FlameIcon> : null}
        <Vals>
          <Current>{`${sensor?.temperature ? sensor.temperature : "n/a"}°C`}</Current>
          <Setpoint val={getCurrentSetpointV2(target)[1]}>
            {getCurrentSetpointV2(target)[1] > 5 ? `${getCurrentSetpointV2(target)[1]}°C` : "Off"}
          </Setpoint>
        </Vals>

        <Arrow src={rightArrow} />
      </Container>
    </>
  );
};

export default Setpoints;

export interface Props {
  roomName: string;
  onClick: any;
  close: any;
}

const query = gql`
  query ($roomName: String) {
    valve: getValve(room: $roomName) {
      state
      connected
      _id
    }
    heating: getPlug(name: "heating") {
      state
      connected
      _id
    }
    sensor: getSensor(room: $roomName) {
      temperature
      connected
      _id
    }
    setpoints: getRoom(name: $roomName) {
      setpoints {
        weekend
        weekday
      }
    }
  }
`;

type QueryResponse = {
  valve: Plug;
  heating: Plug;
  sensor: {
    temperature: string;
    connected: boolean;
    _id: string;
  };
  setpoints: {
    setpoints: {
      weekday: Record<string, string>;
      weekend: Record<string, string>;
    };
  };
};

type Plug = {
  state?: boolean;
  connected?: boolean;
  _id?: string;
};

const borders = false;

const Container = styled.div`
  border: ${borders ? "1px solid yellow" : "none"};
  width: 100%;
  color: white;
  border-bottom: 1px solid grey;
  display: flex;
  align-items: center;
  margin: auto;
  min-height: 0px;
  cursor: pointer;

  ${mq("large")} {
    /* background-color: red; */
    /* height: 200px; */
    width: 200px;
    flex-direction: column;
    border: 1px solid grey;
    border-radius: 20px;
    margin: 10px 100px 10px 100px;
    /* margin-bottom: 50px; */
    /* background-color: orange; */
    /* max-width: ${px("medium")}px; */
  }
`;

const RoomName = styled.h3`
  border: ${borders ? "1px solid green" : "none"};
  display: item;
  align-self: center;
  flex-grow: 1;
  color: ${(props: { connected: boolean }) => (props.connected ? "white" : "orangered")};

  ${mq("large")} {
    flex-grow: 0;
  }
`;

const FlameIcon = styled.img`
  border: ${borders ? "1px solid blue" : "none"};
  height: 35px;
  margin-right: 1.5rem;
  margin-top: -10px;

  ${mq("large")} {
    margin-right: 0;
    margin-top: -10px;
  }
`;

const Vals = styled.div`
  border: ${borders ? "1px solid orange" : "none"};
  display: flex;

  align-items: center;
  min-width: 3rem;
  margin-right: 1.5rem;

  ${mq("large")} {
    width: 100%;
    align-self: flex-start;
    justify-content: center;
    margin-bottom: 1rem;
  }
`;

const Current = styled.div`
  border: ${borders ? "1px solid red" : "none"};
  margin-top: 2px;
  text-align: center;
  margin-right: 1.5rem;
  min-width: 3rem;
`;

const Setpoint = styled.div`
  border: ${borders ? "1px solid purple" : "none"};
  text-align: center;
  /* margin-right: 1.5rem; */
  min-width: 3.5rem;
  color: ${(props: { val: number }) => (props.val > -1 ? "white" : "grey")};
`;

const Arrow = styled.img`
  border: ${borders ? "1px solid brown" : "none"};
  height: 20px;
  min-width: 1rem;

  ${mq("large")} {
    display: none;
  }
`;
