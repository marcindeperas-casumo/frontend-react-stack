import { Mutation } from "@apollo/client/react/components";
import React from "react";
import * as A from "Types/apollo";
import { SET_FAVOURITES } from "Models/apollo/mutations";
import type { MutationProps } from "Models/apollo/types";

export const SetFavouritesMutation = (
  props: MutationProps<
    A.SetFavouritesMutation,
    A.SetFavouritesMutationVariables
  >
) => (
  <Mutation
    {...props}
    mutation={SET_FAVOURITES}
    refetchQueries={() => [
      "UserNavigation",
      "LaunchableKambiClientQuery",
      "SportsShellQuery",
    ]}
  >
    {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'MutationFunctionOptions<SetFavouritesMutatio... Remove this comment to see the full error message */}
    {props.children}
  </Mutation>
);
