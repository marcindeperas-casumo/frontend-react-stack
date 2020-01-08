// @flow
import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { GameTile } from "Components/GameTile/GameTile";
import { AddGameToMyList } from "./GameTile.graphql";

// __FIX__: change "id" to "game" here + add Flow typing
export const GameTileContainer = ({ id }) => {
  // __FIX__: update all properties to come from the Apollo store
  return (
    <GameTile
      game={id}
      isInMyList={false}
      onLaunchGame={() => {}}
      onFavouriteGame={() => {
        console.log("favouritinK");
      }}
    />
  );
};
