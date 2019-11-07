// @flow
import React from "react";
import { Mutation } from "react-apollo";
import { OPEN_MODAL_MUTATION } from "Models/apollo/mutations";
import type { MutationProps } from "Models/apollo/types";

export const OpenModalMutation = (
  props: MutationProps<A.OpenModal, A.OpenModalVariables>
) => (
  <Mutation {...props} mutation={OPEN_MODAL_MUTATION}>
    {props.children}
  </Mutation>
);
