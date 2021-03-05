import type { FetchPolicy, MutationFunctionOptions } from "@apollo/client";
import * as React from "react";

export type MutationProps<D, V> = {
  variables?: V;
  children: MutationFunctionOptions<D, V>;
};

export type QueryProps<D, V> = {
  variables?: V;
  children: (data: D) => React.ReactNode;
  fetchPolicy?: FetchPolicy;
};
