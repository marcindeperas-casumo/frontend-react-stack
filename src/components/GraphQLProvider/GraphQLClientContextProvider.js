// @flow
import * as React from "react";
import apolloClient from "Services/apolloClient";
import type { ApolloClientType } from "Models/apollo/apollo.client";
type Props = {
  children: React.Node,
};

export const GraphQLClientContext = React.createContext<{
  client: ApolloClientType,
}>();

export const GraphQLClientContextProvider = ({ children }: Props) => (
  <GraphQLClientContext.Provider value={{ client: apolloClient }}>
    {children}
  </GraphQLClientContext.Provider>
);
