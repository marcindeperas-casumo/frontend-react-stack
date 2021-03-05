import { Mutation } from "@apollo/client/react/components";
import React from "react";
import * as A from "Types/apollo";
import { CLOSE_MODAL_MUTATION } from "Models/apollo/mutations";
import type { MutationProps } from "Models/apollo/types";

export const CloseModalMutation = (
  props: MutationProps<A.CloseModalMutation, A.CloseModalMutationVariables>
) => (
  <Mutation {...props} mutation={CLOSE_MODAL_MUTATION}>
    {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'MutationFunctionOptions<CloseModalMutation, ... Remove this comment to see the full error message */}
    {props.children}
  </Mutation>
);
