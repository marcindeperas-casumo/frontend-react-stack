/* @flow */
import clientSchema from "./clientSchema.graphql";
import resolvers from "./resolvers";
export { default as defaultState } from "./defaultState";

export const clientState = {
  typeDefs: clientSchema,
  resolvers,
};

export * from "./mutations";

export * from "./queries";

export * from "./typedComponents";
