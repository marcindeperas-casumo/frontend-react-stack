// @flow
import React from "react";
import { Mutation } from "react-apollo";
import { CLOSE_MODAL_MUTATION } from "Models/apollo/mutations";
import type { MutationProps } from "Models/apollo/types";

export const CloseModalMutation = (
  props: MutationProps<gCloseModal, gCloseModalVariables>
) => (
  <Mutation {...props} mutation={CLOSE_MODAL_MUTATION}>
    {props.children}
  </Mutation>
);
