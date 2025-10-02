import { FC, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { gql, useMutation } from "@apollo/client";
import { Selector, BooleanStateIndicator } from "@/lib/ui";
import { useAppContext } from "@/lib/context";
import Details from "./audioSelectorDetails";
import { ComputerAudio } from "@/lib/gqlTypes";

const AudioSelectorV2: FC<Props> = ({ initialData, openDetails, setOpenDetails }) => {
  const { socket } = useAppContext();

  const [updateComputerAudio] = useMutation(mutation, {});
  const [computerAudioData, setComputerAudioData] = useState<ComputerAudio>(initialData);

  const buttonclicked = (relay: string): any => {
    const { left, right, sub, mixer } = initialData;

    if (relay === "master") {
      updateComputerAudio({
        variables: {
          input: {
            master: computerAudioData.left && computerAudioData.right && computerAudioData.sub && computerAudioData.mixer ? false : true,
          },
        },
      });
    } else {
      const input: any = { left, right, sub, mixer };
      input[relay] = !input[relay];
      updateComputerAudio({ variables: { input } });
    }
  };

  const { name, _id, connected, left, right, sub, mixer } = computerAudioData;
  const master = left && right && sub && mixer;

  useEffect(() => {
    if (_id) {
      socket.on(_id, (payload: any) => {
        setComputerAudioData(payload);
      });
    }

    return () => {
      socket.off(_id);
    };
  }, [_id, socket]);

  return (
    <>
      <Container>
        <Selector name={name} openDetails={openDetails} onClick={setOpenDetails}>
          <BooleanStateIndicator state={master} connected={connected} size={"large"} />
        </Selector>
        {openDetails === name ? <Details data={computerAudioData} buttonClicked={(relay: string) => buttonclicked(relay)} /> : null}
      </Container>
    </>
  );
};

export default AudioSelectorV2;

interface Props {
  initialData: ComputerAudio;
  openDetails: string;
  setOpenDetails: (key: string) => void;
}

const mutation = gql`
  mutation ($input: ComputerAudioInput) {
    updateComputerAudio(input: $input) {
      name
    }
  }
`;

const Container = styled.div`
  color: white;
  width: 100%;
  border-bottom: 1px solid grey;

  display: flex;
  flex-direction: column;
  margin: auto;
`;
