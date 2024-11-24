import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, DefaultOptions } from "@apollo/client";
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
};

const App: React.FC = () => {
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
            </Layout>
          </AppProvider>
        </ApolloProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
