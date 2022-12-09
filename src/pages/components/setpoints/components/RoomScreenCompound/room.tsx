import React, { FC, useState, createContext, useContext } from "react";
import { getCurrentSetpointV2 as getCurrentSetpoint } from "src/lib/api";
import { useQuery, gql, useMutation } from "@apollo/client";
import Title from "./title";
import Status from "./status";

export const RoomContext = createContext<IRoomContext | undefined>(undefined);

// type IRoomContext = {
//   name: string;
//   temperature: number;
//   getCurrentSetpoint: (setpoints: any) => any[];
//   data: Object;
//   refetch: () => void;
// };
type IRoomContext = any;

export const useRoom = (): IRoomContext => {
  const context = useContext(RoomContext);
  if (context === undefined) {
    throw new Error("This component must be rendered inside a Dropdown component");
  }
  return context;
};

const temperature = 12;

type Props = {
  name: string;
  temperature: number;
};

const Room: FC<Props> & {
  Title: FC;
  Status: FC;
} = ({ name, children }) => {
  const useRequest = (request: any, variables: any) => {
    console.log(request);
    const { data, refetch } = useQuery<any>(request, {
      variables,
      fetchPolicy: "no-cache",
      onCompleted() {},
    });
    console.log(data);

    // const data = 2;
    // const refetch = () => console.log("refetch");
    // return { data, refetch };
    return { data: 2, refetch: () => console.log("bosad") };
  };

  const borders = false;

  return (
    <RoomContext.Provider
      value={{
        name,
        temperature,
        getCurrentSetpoint,
        useRequest,
        borders,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

Room.Title = Title;
Room.Status = Status;

// const Dropdown: FC & {
//   ListItem: FC<ListItemProps>;
//   Title: FC<TitleProps>;
//   Content: FC;
// } = ({ children }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <DropdownContext.Provider value={{ open, setOpen }}>
//       <div className={css(styles.itemContainer)}>{children}</div>
//     </DropdownContext.Provider>
//   );
// };

export default Room;
