import { useState } from "react";
import Selector, { SensorData } from "./components/selector";
import { PageTitle, PageContents } from "@/lib/components";
import { useQuery, gql } from "@apollo/client";

const Sensors: React.FC = () => {
  const [openSensor, setOpenSensor] = useState<string>("");
  const [sensors, setSensors] = useState<SensorData[] | null>(null);

  const { data } = useQuery(query, {
    variables: {
      name: "heating",
    },
    fetchPolicy: "no-cache",
    onCompleted() {
      setSensors(data.sensors);
    },
  });

  if (!sensors) return <></>;

  return (
    <>
      <PageTitle desc={`Live sensor data`}>Sensors</PageTitle>
      <PageContents>
        {sensors.map((sensorData: SensorData) => {
          return (
            <Selector
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

const query = gql`
  query {
    sensors: getSensors {
      room
      rawTemperature
      temperature
      humidity
      offset
      connected
      _id
    }
  }
`;
