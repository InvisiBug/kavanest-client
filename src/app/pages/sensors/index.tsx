import React from "react";
import Sensor from "./components/roomSelector";
import { PageTitle } from "../../lib";
import { useQuery, gql } from "@apollo/client";

const Sensors: React.FC = () => {
  const { loading, error, data } = useQuery(getRoomsWithSensors, {
    variables: {
      name: "heating",
    },
    // fetchPolicy: "no-cache",
  });

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <PageTitle desc={`Heating is probably ${data.heating ? "on" : "off"}, I've no idea`}>Sensors</PageTitle>

      {data.avaliableRooms.map((sensor: any) => {
        return <Sensor sensor={sensor} key={Math.random()}></Sensor>;
      })}
    </>
  );
};

export default Sensors;

const getRoomsWithSensors = gql`
  query GetAllSensors($name: String) {
    avaliableRooms: getAllSensors {
      room
      rawTemperature
      temperature
      humidity
      offset
      connected
    }
    heating: getPlug(name: $name) {
      state
    }
  }
`;
