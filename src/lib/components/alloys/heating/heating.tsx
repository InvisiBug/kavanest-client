import React, { FC, useState, createContext, useContext } from "react";
import { getCurrentSetpointV2 as getCurrentSetpoint } from "src/lib/api";
import { useQuery, gql, useMutation } from "@apollo/client";

// https://www.patterns.dev/posts/compound-pattern
// https://codesandbox.io/s/provider-pattern-2-ck29r?from-embed=&file=/src/FlyOut.js
export const HeatingContext = createContext<IHeatingContext | undefined>(undefined);

// type IHeatingContext = {
//   name: string;
//   temperature: number;
//   getCurrentSetpoint: (setpoints: any) => any[];
//   data: Object;
//   refetch: () => void;
// };
type IHeatingContext = any;

const off = false;
const on = true;

export const useHeating = (): IHeatingContext => {
  const context = useContext(HeatingContext);
  if (context === undefined) {
    throw new Error("This component must be rendered inside a Dropdown component");
  }
  return context;
};

const temperature = 12;

type Props = {
  name?: string;
};

const Heating: FC<Props> & {
  // Title: FC;
  // Status: FC;
  // Override: FC;
} = ({ name, children }) => {
  // const useRequest = (request: any, variables: any) => {
  //   console.log(request);
  //   const { data, refetch } = useQuery<any>(request, {
  //     variables,
  //     fetchPolicy: "no-cache",
  //     onCompleted() {},
  //   });
  //   console.log(data);

  //   // const data = 2;
  //   // const refetch = () => console.log("refetch");
  //   // return { data, refetch };
  //   return { data: 2, refetch: () => console.log("bosad") };
  // };

  const borders = off;

  return (
    <HeatingContext.Provider
      value={{
        name,
        temperature,
        getCurrentSetpoint,
        borders,
      }}
    >
      {children}
    </HeatingContext.Provider>
  );
};

// Heating.Title = Title;
// Heating.Status = Status;
// Heating.Override = Override;

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

export default Heating;
