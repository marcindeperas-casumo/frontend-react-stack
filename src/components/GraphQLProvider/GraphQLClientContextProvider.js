// @flow
import * as React from "react";
import { apolloClient } from "Models/apollo/apollo.client";
import type { ApolloClientType } from "Models/apollo/apollo.client";
type Props = {
  children: React.Node,
};

// Ignore not having any default data.
// This saves us null checking the context each time its used in classes.
// (The default data would only be needed when the Consumer is not a child of Provider, which doesn't happen here)
// $FlowIgnore
export const GraphQLClientContext = React.createContext<{
  client: ApolloClientType,
}>();

export const GraphQLClientContextProvider = ({ children }: Props) => (
  <GraphQLClientContext.Provider value={{ client: apolloClient }}>
    {children}
  </GraphQLClientContext.Provider>
);
