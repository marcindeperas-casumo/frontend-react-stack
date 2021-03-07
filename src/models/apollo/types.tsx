// @flow
import type { MutationRenderPropFunction } from "@apollo/client/react/components";
import type { FetchPolicy } from "@apollo/client";
import * as React from "react";

export type MutationProps<D, V> = {
  variables?: V,
  children: MutationRenderPropFunction<D, V>,
};

export type QueryProps<D, V> = {
  variables?: V,
  children: (data: D) => React.Node,
  fetchPolicy?: FetchPolicy,
};
