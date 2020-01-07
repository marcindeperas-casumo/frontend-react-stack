// @flow
import React from "react";
import LiveCasinoCard from "Components/LiveCasinoCard/LiveCasinoCard";

// __FIX__: rename "id" to "item" here and add types
export const LiveCasinoCardContainer = ({ id }) => {
  // __FIX__: connect the rest of the props to the Apollo stack as well
  return id.liveCasinoLobby ? (
    <LiveCasinoCard
      game={id}
      isInMyList={false}
      launchGame={() => {}}
      onFavouriteGame={() => {}}
      subscribeToUpdates={() => {}}
      unsubscribeFromUpdates={() => {}}
    />
  ) : null;
};
