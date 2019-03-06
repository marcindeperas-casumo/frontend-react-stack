// @flow
import React from "react";
import TileListHorizontal from "Components/TileListHorizontal/TileListHorizontal";
import { types } from "./TileListHorizontal.constants";
import withGameProviderProps from "./GameProviderProps";

type Props = {
  /** Type of list (e.g, game-providers) */
  type: string,
  title: string,
};

const TileListHorizontalContainer = (props: Props) => {
  if (props.type === types.GAME_PROVIDERS) {
    const GameProviderList = withGameProviderProps(TileListHorizontal);
    return <GameProviderList title={props.title} />;
  }
  return <TileListHorizontal title={props.title} />;
};

export default TileListHorizontalContainer;
