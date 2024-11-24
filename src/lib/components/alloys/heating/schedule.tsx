import { FC, useState } from "react";
import { useHeating } from "@/lib/components";
import { plus, sinchronize } from "@/lib/components";
import { useQuery, gql, useMutation } from "@apollo/client";
import { decamelize, weekOrWeekend } from "@/lib/helpers";
import { getCurrentSetpointV2 } from "@/lib/api";
import styled from "@emotion/styled";
import { CurrentSetpoint, NewSetpoint } from "./components/setpoints";

const Schedule: FC = () => {
  const { name } = useHeating();
  const [dayType, setDays] = useState<string>(weekOrWeekend());
  const [showNewSetpoint, setShowNewSetpoint] = useState<boolean>(false);

  const { data, refetch } = useQuery<any>(request, {
    variables: { room: name },
    fetchPolicy: "no-cache",
    onCompleted() {
      // console.log(data);
      // console.log(data.schedule.setpoints);
    },
  });

  const close = () => {
    setShowNewSetpoint(false);
    refetch();
  };

  //* Move this to its own component
  const AddButton = () => {
    return (
      <>
        {showNewSetpoint ? (
          <>
            <NewSetpoint close={close} room={name} day={dayType} />
          </>
        ) : (
          <>
            <Add src={plus} onClick={() => setShowNewSetpoint(true)} />
          </>
        )}
      </>
    );
  };

  // If theres no schedule, show the add button
  if (!data || !data.schedule) {
    return (
      <Row>
        <AddButton />
      </Row>
    );
  }

  const {
    schedule: { setpoints },
  } = data;

  return (
    <div>
      {/* This wants to stay as a div */}
      <Row>
        {/* Make these chips instead of a h1 */}
        <h1 onClick={() => (dayType === "weekday" ? setDays("weekend") : setDays("weekday"))}>
          {`${decamelize(dayType)}s `}
          <Icon src={sinchronize} />
        </h1>
      </Row>
      {setpoints && setpoints[dayType]
        ? Object.keys(setpoints[dayType]).map((time: any) => {
            const currentSetpoint = getCurrentSetpointV2(setpoints);
            let highlight = false;

            const temp = setpoints[dayType][time];

            if (currentSetpoint && dayType === weekOrWeekend()) {
              if (time === currentSetpoint[0]) {
                highlight = true;
              }
            }

            console.log(temp);

            return (
              <Row key={Math.random()}>
                {/* console.log(temp) */}
                <CurrentSetpoint room={name} day={dayType} time={time} temp={temp} close={refetch} activeSetpoint={highlight} />
              </Row>
            );
          })
        : null}
      <Row>
        <AddButton />
      </Row>
    </div>
  );
};

export default Schedule;

const request = gql`
  query GetSchedule($room: String) {
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

const Add = styled.img`
  border: ${borders ? "1px solid green" : "none"};
  height: 1.8rem;
  cursor: pointer;
  /* margin-bottom: 20px; */
`;
