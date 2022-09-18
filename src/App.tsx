import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, DefaultOptions } from "@apollo/client";
import { AppProvider } from "src/lib/context";
import { apiUrl } from "src/lib/api";
import { Layout } from "src/lib";
import Pages from "src/pages";

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
    defaultOptions: defaultOptions,
    uri: apiUrl,
    cache: new InMemoryCache(),
  });

  return (
    <>
      <ApolloProvider client={client}>
        <AppProvider>
          <Layout>
            <Pages />
          </Layout>
        </AppProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
