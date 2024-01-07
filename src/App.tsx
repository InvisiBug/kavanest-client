import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, DefaultOptions } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "src/lib/context";
import { apiUrl } from "src/lib/api";
import { Layout } from "src/lib/components";
import Pages from "src/pages";

// Some vital change (to get the git pipeline working again)
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
      <BrowserRouter>
        <ApolloProvider client={client}>
          <AppProvider>
            <Layout>
              <Pages />
            </Layout>
          </AppProvider>
        </ApolloProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
