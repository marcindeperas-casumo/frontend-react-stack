// @flow
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { apolloClient } from "Models/apollo/apollo.client";
import { GraphQLClientContextProvider } from "./GraphQLClientContextProvider";

type Props = {
  children: React.Node,
};

export const GraphQLProvider = ({ children }: Props) => (
  <ApolloProvider client={apolloClient}>
    <GraphQLClientContextProvider>{children}</GraphQLClientContextProvider>
  </ApolloProvider>
);
