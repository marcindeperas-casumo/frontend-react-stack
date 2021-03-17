import { Mutation } from "@apollo/client/react/components";
import React from "react";
import * as A from "Types/apollo";
import { SET_FAVOURITE_COMPETITIONS } from "Models/apollo/mutations";
import type { MutationProps } from "Models/apollo/types";

export const SetFavouriteCompetitions = (
  props: MutationProps<
    A.SetFavouritesMutation,
    A.SetFavouritesMutationVariables
  >
) => (
  <Mutation
    {...props}
    mutation={SET_FAVOURITE_COMPETITIONS}
    refetchQueries={() => ["UserNavigation"]}
  >
    {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'MutationFunctionOptions<SetFavouritesMutatio... Remove this comment to see the full error message */}
    {props.children}
  </Mutation>
);
