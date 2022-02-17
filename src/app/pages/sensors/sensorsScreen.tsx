import React, { useState } from "react";
import RoomSelector, { SensorData } from "./components/roomSelector";
import { PageTitle, PageContents } from "../../lib";
import { useQuery, gql } from "@apollo/client";

const Sensors: React.FC = () => {
  const [openSensor, setOpenSensor] = useState<string>("");
  const [sensors, setSensors] = useState<SensorData[] | null>(null);
  const [heating, setHeating] = useState<HeatingData | null>(null);

  const { data } = useQuery(query, {
    variables: {
      name: "heating",
    },
    fetchPolicy: "no-cache",
    onCompleted() {
      setSensors(data.sensors);
      setHeating(data.heating);
    },
  });

  if (!sensors) return <></>;

  return (
    <>
      <PageTitle desc={`Live sensor data`}>Sensors</PageTitle>
      <PageContents>
        {sensors.map((sensorData: SensorData) => {
          return (
            <RoomSelector
              thisSensor={sensorData}
              allSensors={sensors}
              setAllSensors={setSensors}
              openSensor={openSensor}
              setOpenSensor={setOpenSensor}
              key={Math.random()}
            />
          );
        })}
      </PageContents>
    </>
  );
};

export default Sensors;

interface HeatingData {
  state: boolean;
}

const query = gql`
  query ($name: String) {
    sensors: getSensors {
      room
      rawTemperature
      temperature
      humidity
      offset
      connected
      _id
    }
    heating: getPlug(name: $name) {
      state
    }
  }
`;

interface Data {
  availableRooms: {
    room: string;
    rawTemperature: number;
    temperature: number;
    humidity: number;
    offset: number;
    connected: boolean;
    _id: string;
  };
}
