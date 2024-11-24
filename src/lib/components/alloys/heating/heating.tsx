import React, { FC, useState, createContext, useContext } from "react";
import { getCurrentSetpointV2 as getCurrentSetpoint } from "@/lib/api";
import { mq, px } from "@/lib/mediaQueries";
import { useQuery, gql, useMutation } from "@apollo/client";
import Styled from "@emotion/styled";

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
      <Container>{children}</Container>
    </HeatingContext.Provider>
  );
};

const Container = Styled.div`
  /* border:1px solid white; */
  ${mq("large")} {
    /* background-color:orange; */
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-audo-rows: 1fr 1fr;
    gap: 10px;
    grid-template-areas:
    "title title title"
    "main main sidebar";

    & > div {
      border:1px solid grey;
      border-radius: 5px;
      // Apply to child divs
      /* flex: 25%; */
      /* padding: 10%; */
      /* margin-bottom: 200px; */
    }
  }


`;

// border:1px solid white;
//     height:vh;
//     margin-top:50%;
//     -webkit-transform: translate(0, -75%); // Dunno why this is -75% but it works, lol that "but it works" was ai generated
//     transform: translate(0, -75%);
//     /* border: 1px solid white; */
//     display: grid;
//     grid-template-columns: 1fr 1fr 1fr;
//     grid-gap: 100px;
//     /* flex-direction: row;
//     flex-wrap: wrap;

//     justify-content: space-around; */
//     /* background-color: orange; */
//     /* max-width: ${px("medium")}px; */
// & > div {
//   border:1px solid red;
//   // Apply to child divs
//   /* flex: 25%; */
//   /* padding: 10%; */
//   /* margin-bottom: 200px; */
// }

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
