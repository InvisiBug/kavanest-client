import React, { useState } from "react";
import styled from "@emotion/styled";
import CurrentSetpoint from "./currentSetpoint";
import { plus } from "../../../../lib";
import { decamelize } from "../../../../utils";
import NewSetpoint from "./newSetpoint";

const SetpointList = ({ room, data, days, refreshPage, setDays }: any) => {
  const [showNewSetpoint, setShowNewSetpoint] = useState<boolean>(false);

  const close = () => {
    setShowNewSetpoint(false);
    refreshPage();
  };

  return (
    <>
      <SetpointRow>
        <h1 onClick={() => (days === "weekday" ? setDays("weekend") : setDays("weekday"))}>{`${decamelize(days)}s`}</h1>
      </SetpointRow>

      {data.setpoints && data.setpoints.setpoints[days] //* Are there setpoints & are there setpoints for our day type
        ? Object.keys(data.setpoints.setpoints[days]).map((time: any) => {
            const temp = data.setpoints.setpoints[days][time];
            return (
              <SetpointRow key={Math.random()}>
                <CurrentSetpoint room={room} day={days} time={time} temp={temp} close={refreshPage} />
              </SetpointRow>
            );
          })
        : null}

      <SetpointRow>
        {showNewSetpoint ? <NewSetpoint close={close} room={room} day={days} /> : <Add src={plus} onClick={() => setShowNewSetpoint(true)} />}
      </SetpointRow>
    </>
  );
};

export default SetpointList;

const borders: boolean = false;

const SetpointRow = styled.div`
  border: ${borders ? "1px solid white" : "none"};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
`;

const Add = styled.img`
  border: ${borders ? "1px solid green" : "none"};
  height: 1.8rem;
  margin-bottom: 20px;
`;
