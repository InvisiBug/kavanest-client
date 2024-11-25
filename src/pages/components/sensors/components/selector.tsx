import { useEffect } from "react";
import styled from "@emotion/styled";
import { useAppContext } from "@/lib/context";
import { Selector, Text } from "@/lib/ui";
import SensorDetails from "./details";

const Sensor: React.FC<Props> = ({
  thisSensor: { room, temperature, rawTemperature, humidity, offset, connected, _id },
  allSensors,
  setAllSensors,
  openSensor,
  setOpenSensor,
}) => {
  const { socket } = useAppContext();

  useEffect(() => {
    if (_id) {
      socket.on(_id, (payload: any) => {
        const updatedSensors: Array<SensorData> = [...allSensors];

        for (let thisSensor in updatedSensors) {
          if (updatedSensors[thisSensor].room === room) {
            updatedSensors[thisSensor] = payload;
          }
        }

        setAllSensors(updatedSensors);
      });
    }

    return () => {
      socket.off(_id);
    };
  }, []); // eslint-disable-line

  return (
    <>
      <Container>
        <Selector connected={connected} name={room} openDetails={openSensor} onClick={setOpenSensor} arrow={true}>
          <Temp>
            <Text>{`${temperature}°C`}</Text>
          </Temp>
        </Selector>

        {openSensor === room ? (
          <div onClick={() => setOpenSensor(openSensor === room ? "" : room)}>
            <SensorDetails temperature={temperature} rawTemperature={rawTemperature} humidity={humidity} offset={offset} connected={connected} />
          </div>
        ) : null}
      </Container>
    </>
  );
};

export default Sensor;

interface Props {
  thisSensor: SensorData;
  allSensors: Array<SensorData>;
  setAllSensors: (key: Array<SensorData>) => void;
  openSensor: string;
  setOpenSensor: (key: string) => void;
}
export interface SensorData {
  room: string;
  rawTemperature: number;
  temperature: number;
  humidity: number;
  offset: number;
  connected: boolean;
  _id?: string;
}

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

const Temp = styled.div`
  margin-right: 20px;
`;
