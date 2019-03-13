/* @flow */
import * as React from "react";
import { Mutation } from "react-apollo";
import type { MutationProps } from "../types";
import * as mutations from "./mutations";

export const ToggleFavouriteGroupMutation = (
  props: MutationProps<ToggleFavouriteGroup, ToggleFavouriteGroupVariables>
) => (
  <Mutation {...props} mutation={mutations.TOGGLE_FAVOURITE_GROUP_MUTATION}>
    {props.children}
  </Mutation>
);

export const SetFavouritesMutation = (
  props: MutationProps<SetFavourites, SetFavouritesVariables>
) => (
  <Mutation
    {...props}
    mutation={mutations.SET_FAVOURITES}
    refetchQueries={() => [
      "UserNavigation",
      "LaunchableKambiClientQuery",
      "SportsShellQuery",
    ]}
  >
    {props.children}
  </Mutation>
);

export const SetFavouriteCompetitions = (
  props: MutationProps<SetFavourites, SetFavouritesVariables>
) => (
  <Mutation
    {...props}
    mutation={mutations.SET_FAVOURITE_COMPETITIONS}
    refetchQueries={() => ["UserNavigation"]}
  >
    {props.children}
  </Mutation>
);
