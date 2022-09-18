import React, { useState } from "react";
import styled from "@emotion/styled";
import CurrentSetpoint from "./currentSetpoint";
import { plus, sinchronize } from "../../../../../lib";
import { getCurrentSetpointV2 } from "src/lib/api";
import { decamelize, weekOrWeekend } from "src/lib/helpers";
import NewSetpoint from "./newSetpoint";

const SetpointList = ({ room, data, refreshPage }: any) => {
  const [dayType, setDays] = useState<string>(weekOrWeekend());
  const [showNewSetpoint, setShowNewSetpoint] = useState<boolean>(false);

  const close = () => {
    setShowNewSetpoint(false);
    refreshPage();
  };

  return (
    <>
      <Row>
        <h1 onClick={() => (dayType === "weekday" ? setDays("weekend") : setDays("weekday"))}>
          {`${decamelize(dayType)}s `}
          <Icon src={sinchronize} />
        </h1>
      </Row>

      {data?.room?.setpoints && data.room?.setpoints[dayType] //* Are there setpoints & are there setpoints for our day type
        ? Object.keys(data.room.setpoints[dayType]).map((time: any) => {
            const currentSetpoint = getCurrentSetpointV2(data.room.setpoints);
            let highlight = false;

            const temp = data.room.setpoints[dayType][time];

            if (currentSetpoint && dayType === weekOrWeekend()) {
              if (time === currentSetpoint[0]) {
                highlight = true;
              }
            }

            return (
              <Row key={Math.random()}>
                <CurrentSetpoint room={room} day={dayType} time={time} temp={temp} close={refreshPage} activeSetpoint={highlight} />
              </Row>
            );
          })
        : null}

      <Row>
        {showNewSetpoint ? <NewSetpoint close={close} room={room} day={dayType} /> : <Add src={plus} onClick={() => setShowNewSetpoint(true)} />}
      </Row>
    </>
  );
};

export default SetpointList;

const borders: boolean = false;

const Row = styled.div`
  border: ${borders ? "1px solid white" : "none"};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
`;

const Add = styled.img`
  border: ${borders ? "1px solid green" : "none"};
  height: 1.8rem;
  /* margin-bottom: 20px; */
`;

const Icon = styled.img`
  border: ${borders ? "1px solid red" : "none"};
  height: 1.5rem;
  vertical-align: middle;
  margin: 0;
`;
