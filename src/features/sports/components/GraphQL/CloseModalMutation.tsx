// @flow
import React from "react";
import { Mutation } from "@apollo/client/react/components";
import * as A from "Types/apollo";
import { CLOSE_MODAL_MUTATION } from "Models/apollo/mutations";
import type { MutationProps } from "Models/apollo/types";

export const CloseModalMutation = (
  props: MutationProps<A.CloseModal, A.CloseModalVariables>
) => (
  <Mutation {...props} mutation={CLOSE_MODAL_MUTATION}>
    {props.children}
  </Mutation>
);
