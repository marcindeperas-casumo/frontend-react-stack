// @flow
import React from "react";
import { Mutation } from "@apollo/client/react/components";
import * as A from "Types/apollo";
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
