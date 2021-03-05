import { Mutation } from "@apollo/client/react/components";
import React from "react";
import * as A from "Types/apollo";
import { NAVIGATE_CLIENT_MUTATION } from "Models/apollo/mutations";
import type { MutationProps } from "Models/apollo/types";

export const NavigateClientMutation = (
  props: MutationProps<
    A.NavigateClientMutation,
    A.NavigateClientMutationVariables
  >
) => (
  <Mutation {...props} mutation={NAVIGATE_CLIENT_MUTATION}>
    {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'MutationFunctionOptions<NavigateClientMutati... Remove this comment to see the full error message */}
    {props.children}
  </Mutation>
);
