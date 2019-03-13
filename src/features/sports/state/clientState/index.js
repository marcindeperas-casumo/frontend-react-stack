/* @flow */
import { type ClientStateConfig } from "apollo-link-state";
import clientSchema from "./clientSchema.graphql";
import resolvers from "./resolvers";
import defaultState from "./defaultState";

export const clientState: ClientStateConfig = {
  defaults: defaultState,
  typeDefs: clientSchema,
  resolvers,
};

export * from "./mutations";

export * from "./queries";

export * from "./typedComponents";
