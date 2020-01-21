// @flow
import React from "react";
import GameTileExclusive from "Components/GameTileExclusive/GameTileExclusive";
import * as A from "Types/apollo";

type Props = {
  item: A.GameTile_Game,
};

// __FIX__: this should take a game but because of
// https://github.com/Casumo/frontend-react-stack/blob/master/src/components/ScrollableList/ScrollableList.js#L42
// it's set as something else.
export const GameTileExclusiveContainer = ({ item }: Props) => {
  // __FIX__: update all properties to come from the Apollo store
  return <GameTileExclusive game={item} onLaunchGame={() => {}} />;
};
