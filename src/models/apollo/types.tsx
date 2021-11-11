import type {
  FetchPolicy,
  MutationFunctionOptions,
  ApolloCache,
  DefaultContext,
} from "@apollo/client";
import * as React from "react";

export type MutationProps<D, V> = {
  variables?: V;
  children: MutationFunctionOptions<D, V, DefaultContext, ApolloCache<any>>;
};

export type QueryProps<D, V> = {
  variables?: V;
  children: (data: D) => React.ReactNode;
  fetchPolicy?: FetchPolicy;
};
