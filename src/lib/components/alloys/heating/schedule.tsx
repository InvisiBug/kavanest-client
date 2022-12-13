import React, { FC, useState } from "react";
import SetpointList from "src/pages/components/setpoints/components/setpointListV2/";
import { useHeating } from "src/lib/components";
import { plus, sinchronize } from "src/lib/components";
import { useQuery, gql, useMutation } from "@apollo/client";
import { decamelize, weekOrWeekend } from "src/lib/helpers";
import { getCurrentSetpointV2 } from "src/lib/api";
import styled from "@emotion/styled";

const Schedule: FC = () => {
  const { name } = useHeating();
  const [dayType, setDays] = useState<string>(weekOrWeekend());
  const [showNewSetpoint, setShowNewSetpoint] = useState<boolean>(false);

  const { data, refetch } = useQuery<any>(request, {
    variables: { room: name },
    fetchPolicy: "no-cache",
    onCompleted() {
      console.log(data.schedule.setpoints);
    },
  });

  if (!data) return null;

  const {
    schedule: { setpoints },
  } = data;

  return (
    <>
      {/* <SetpointList /> */}
      <Row>
        <h1 onClick={() => (dayType === "weekday" ? setDays("weekend") : setDays("weekday"))}>
          {`${decamelize(dayType)}s `}
          <Icon src={sinchronize} />
        </h1>
      </Row>

      {setpoints && setpoints[dayType]
        ? Object.keys(setpoints[dayType]).map((time: any) => {
            const currentSetpoint = getCurrentSetpointV2(setpoints);
            console.log(currentSetpoint);
            let highlight = false;

            const temp = setpoints[dayType][time];

            if (currentSetpoint && dayType === weekOrWeekend()) {
              if (time === currentSetpoint[0]) {
                highlight = true;
              }
            }

            return (
              <Row key={Math.random()}>
                {/* console.log(temp) */}
                {/* <CurrentSetpoint room={room} day={dayType} time={time} temp={temp} close={refreshPage} activeSetpoint={highlight} /> */}
              </Row>
            );
          })
        : null}
      <div>hello from schedule{name}</div>
    </>
  );
};

export default Schedule;

const request = gql`
  query GetSetpoints($room: String) {
    schedule: getRoom(name: $room) {
      setpoints {
        weekend
        weekday
      }
    }
  }
`;

const borders = false;
const Row = styled.div`
  border: ${borders ? "1px solid white" : "none"};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
`;

const Icon = styled.img`
  border: ${borders ? "1px solid red" : "none"};
  height: 1.5rem;
  vertical-align: middle;
  margin: 0;
`;
