import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { refresh, mq, px } from "../../lib";

const Dog: React.FC = () => {
  const [urls, setUrls] = useState<any>(null);

  const getDogs = () => {
    fetch("https://dog.ceo/api/breeds/image/random/50")
      .then((response) => response.json())
      .then((response) => setUrls(response.message));
  };

  useEffect(() => {
    getDogs();
  }, []);

  return (
    <>
      <Container>
        {urls
          ? urls.map((url: any) => {
              return <Pics src={url} key={Math.random()} />;
            })
          : null}
        <Reload
          className={"test"}
          src={refresh}
          onClick={() => {
            setUrls(null);
            getDogs();
          }}
        />
      </Container>
    </>
  );
};

export default Dog;

const Reload = styled.img`
  height: 2rem;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${mq("large")} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const Pics = styled.img`
  margin: 1rem;
  width: 70vw;
  ${mq("large")} {
    /* background-color: orange; */
    max-width: ${px("small")}px;
  }
  object-fit: contain;
`;
