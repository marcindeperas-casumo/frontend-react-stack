import { Mutation } from "@apollo/client/react/components";
import type { MutationFunction, MutationResult } from "@apollo/client";
import * as React from "react";

export type MutationProps<D, V> = {
  mutation: any;
  variables?: V;
  children: (m: MutationResult<D>) => React.ReactNode;
};

type DoMutationProps = {
  mutate: MutationFunction<any, Record<string, any>>;
};
class DoMutation extends React.Component<DoMutationProps> {
  componentDidMount() {
    this.props.mutate();
  }
  render() {
    return null;
  }
}

export class MutateOnMount<D = {}, V = {}> extends React.Component<
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
