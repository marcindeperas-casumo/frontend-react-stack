/* @flow */

import * as React from "react";
import { Mutation } from "react-apollo";
import type { MutationResult } from "react-apollo";
import type { FetchPolicy } from "apollo-client";

export type MutationProps<D, V> = {
  mutation: any,
  variables?: V,
  children: (MutationResult<D>) => React.Node,
  fetchPolicy?: FetchPolicy,
};

type DoMutationProps = {
  mutate: () => any,
};

class DoMutation extends React.Component<DoMutationProps> {
  componentDidMount() {
    this.props.mutate();
  }

  render() {
    return null;
  }
}

export class MutateOnMount<D: * = {}, V: * = {}> extends React.Component<
  MutationProps<D, V>
> {
  render() {
    const { children, ...other } = this.props;

    return (
      <Mutation {...other}>
        {(mutate, result) => {
          return (
            <>
              <DoMutation mutate={mutate} />
              {children && children(result)}
            </>
          );
        }}
      </Mutation>
    );
  }
}
