import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, DefaultOptions } from "@apollo/client";
import { AppProvider } from "./app/utils";
import { apiUrl } from "./app/utils/index";
import { Layout } from "./app/lib/";
import Screens from "./app/";

const defaultOptions: DefaultOptions = {
  query: {
    errorPolicy: "all",
    fetchPolicy: "network-only",
  },
  watchQuery: {
    fetchPolicy: "network-only",
  },
};

const App: React.FC = () => {
  const client = new ApolloClient({
    uri: apiUrl,
    cache: new InMemoryCache(),
  });

  return (
    <>
      <ApolloProvider client={client}>
        <AppProvider>
          <Layout>
            <Screens />
          </Layout>
        </AppProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
