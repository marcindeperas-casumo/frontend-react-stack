// @flow
import React from "react";
import { Mutation } from "react-apollo";
import { SET_FAVOURITES } from "Models/apollo/mutations";
import type { MutationProps } from "Models/apollo/types";

export const SetFavouritesMutation = (
  props: MutationProps<A.SetFavourites, A.SetFavouritesVariables>
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
    {props.children}
  </Mutation>
);
