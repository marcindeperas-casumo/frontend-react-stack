// @flow
import React from "react";
import { Mutation } from "react-apollo";
import { SET_FAVOURITE_COMPETITIONS } from "Models/apollo/mutations";
import type { MutationProps } from "Models/apollo/types";

export const SetFavouriteCompetitions = (
  props: MutationProps<SetFavourites, SetFavouritesVariables>
) => (
  <Mutation
    {...props}
    mutation={SET_FAVOURITE_COMPETITIONS}
    refetchQueries={() => ["UserNavigation"]}
  >
    {props.children}
  </Mutation>
);