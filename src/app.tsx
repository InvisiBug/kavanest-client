import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  DefaultOptions,
  HttpLink,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./lib/context";
import { apiUrl } from "@/lib/api";
import { Layout } from "@/lib/components";
import Pages from "@/pages";

// Some vital change (to get the git pipeline working again)
const defaultOptions: DefaultOptions = {
  query: {
    errorPolicy: "all",
    fetchPolicy: "network-only",
  },
  watchQuery: {
    fetchPolicy: "network-only",
  },
  // "Apollo-Require-Preflight": true,
};

// const customFetch = (uri, options) => {
//   options.mode = 'no-cors';
//   return fetch(uri, options);
// };

const App: React.FC = () => {
  // const client = new ApolloClient({
  //   defaultOptions: defaultOptions,
  //   uri: apiUrl,
  //   cache: new InMemoryCache(),
  // });

  // const client = new ApolloClient({
  //   link: new HttpLink({
  //     uri: "http://api.kavanet.io",
  //     fetchOptions: {
  //       mode: "no-cors", // no-cors, *cors, same-origin
  //     },
  //     headers: {
  //       "Apollo-Require-Preflight": "true",
  //       "Content-Type": "application/json",
  //     },
  //   }),
  //   cache: new InMemoryCache(),
  //   defaultOptions: defaultOptions,
  // });

  const client = new ApolloClient({
    uri: apiUrl,
    cache: new InMemoryCache(),
    defaultOptions,
  });

  return (
    <>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <AppProvider>
            <Layout>
              <Pages />
              <h1>boop</h1>
            </Layout>
          </AppProvider>
        </ApolloProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
