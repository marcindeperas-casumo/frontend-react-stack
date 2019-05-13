// @flow
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import apolloClient from "Services/apolloClient";

type Props = {
  children: React.Node,
};

export const DataProvider = ({ children }: Props) => (
  <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
);
