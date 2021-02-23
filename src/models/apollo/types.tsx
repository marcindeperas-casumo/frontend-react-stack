// @flow
// @ts-expect-error ts-migrate(2305) FIXME: Module '"../../../node_modules/@apollo/client/reac... Remove this comment to see the full error message
import type { MutationRenderPropFunction } from "@apollo/client/react/components";
import type { FetchPolicy } from "@apollo/client";
import * as React from "react";

export type MutationProps<D, V> = {
  variables?: V,
  children: MutationRenderPropFunction<D, V>,
};

export type QueryProps<D, V> = {
  variables?: V,
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  children: (data: D) => React.Node,
  fetchPolicy?: FetchPolicy,
};
