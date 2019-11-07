// @flow
import React from "react";
import { Mutation } from "react-apollo";
import { NAVIGATE_CLIENT_MUTATION } from "Models/apollo/mutations";
import type { MutationProps } from "Models/apollo/types";

export const NavigateClientMutation = (
  props: MutationProps<A.NavigateClient, A.NavigateClientVariables>
) => (
  <Mutation {...props} mutation={NAVIGATE_CLIENT_MUTATION}>
    {props.children}
  </Mutation>
);
