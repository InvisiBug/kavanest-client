import React, { useState } from "react";
import RoomSelector, { SensorData } from "./components/roomSelector";
import { PageTitle } from "../../lib";
import { useQuery, gql } from "@apollo/client";

const Sensors: React.FC = () => {
  const [openSensor, setOpenSensor] = useState<string>("");
  const [sensors, setSensors] = useState<SensorData[] | null>(null);
  const [heating, setHeating] = useState<HeatingData | null>(null);

  const { data } = useQuery(getRoomsWithSensors, {
    variables: {
      name: "heating",
    },
    fetchPolicy: "no-cache",
    onCompleted() {
      setSensors(data.availableRooms);
      setHeating(data.heating);
    },
  });

  // if (loading) return <p>Loading</p>;
  // if (error) return <p>Error</p>;
  // if (!data) return <p>No Data</p>;
  if (!sensors) return <></>;

  return (
    <>
      <PageTitle desc={`Heating is probably ${heating?.state ? "on" : "off"}, I've no idea`}>Sensors</PageTitle>
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
    </>
  );
};

export default Sensors;

interface HeatingData {
  state: boolean;
}

const getRoomsWithSensors = gql`
  query ($name: String) {
    availableRooms: getSensors {
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
