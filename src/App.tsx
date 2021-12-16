import React from "react";
import { Layout } from "./app/templates";
import { AppProvider } from "./app/utils";
import Screens from "./app/";
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";
import { apiUrl } from "./app/utils/index";

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

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

const ExchangeRates = () => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate }: { currency: any; rate: any }) => {
    return (
      <div key={currency}>
        <p>
          {currency}: {rate}
        </p>
      </div>
    );
  });
};
