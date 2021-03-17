import { Mutation } from "@apollo/client/react/components";
import React from "react";
import * as A from "Types/apollo";
import { OPEN_MODAL_MUTATION } from "Models/apollo/mutations";
import type { MutationProps } from "Models/apollo/types";

export const OpenModalMutation = (
  props: MutationProps<A.OpenModalMutation, A.OpenModalMutationVariables>
) => (
  <Mutation {...props} mutation={OPEN_MODAL_MUTATION}>
    {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'MutationFunctionOptions<OpenModalMutation, E... Remove this comment to see the full error message */}
    {props.children}
  </Mutation>
);
