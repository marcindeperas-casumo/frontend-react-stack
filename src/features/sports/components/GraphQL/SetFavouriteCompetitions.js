// @flow
import React from "react";
import { Mutation } from "react-apollo";
import * as A from "Types/apollo";
import { SET_FAVOURITE_COMPETITIONS } from "Models/apollo/mutations";
import type { MutationProps } from "Models/apollo/types";

export const SetFavouriteCompetitions = (
  props: MutationProps<A.SetFavourites, A.SetFavouritesVariables>
) => (
  <Mutation
    {...props}
    mutation={SET_FAVOURITE_COMPETITIONS}
    refetchQueries={() => ["UserNavigation"]}
  >
    {props.children}
  </Mutation>
);
