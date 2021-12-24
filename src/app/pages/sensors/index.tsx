import React, { useState, useEffect } from "react";
import RoomSelector from "./components/roomSelector";
import { PageTitle } from "../../lib";
import { useQuery, gql, useLazyQuery } from "@apollo/client";

const Sensors: React.FC = () => {
  const [openSensor, setOpenSensor] = useState("");
  const [qlUpdate, { loading, error, data }] = useLazyQuery(getRoomsWithSensors, {
    variables: {
      name: "heating",
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    qlUpdate();
  }, []);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;
  if (!data) return <p>No Data</p>;

  console.log("Re-render");
  console.log(data);

  return (
    <>
      <PageTitle desc={`Heating is probably ${data.heating ? "on" : "off"}, I've no idea`}>Sensors</PageTitle>
      {data.avaliableRooms.map((sensorData: any) => {
        return <RoomSelector sensor={sensorData} refetch={qlUpdate} openSensor={openSensor} setOpenSensor={setOpenSensor} key={Math.random()} />;
      })}
      {/* <RoomSelector sensor={{ room: "liamsRoom", _id: "61c4ed5af4deb930c10679c9" }} key={Math.random()} /> */}
    </>
  );
};

export default Sensors;

const getRoomsWithSensors = gql`
  query ($name: String) {
    avaliableRooms: getSensors {
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
