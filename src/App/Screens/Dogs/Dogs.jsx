import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

const Dogs = () => {
  const [dogUrl, setDogUrl] = useState(null);

  useEffect(() => {
    getNewDog();
  }, []);

  const getNewDog = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((response) => {
        setDogUrl(response.message);
        console.log(response.message);
      });
  };

  return <>{dogUrl && <DogImg src={dogUrl} alt="dog" onClick={() => getNewDog()} />}</>;
};

export default Dogs;

const DogImg = styled.img`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  max-width: 80%;
  max-height: 80%;
  cursor: pointer;
  border-radius: 10%;
`;
