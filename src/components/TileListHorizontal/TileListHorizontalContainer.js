// @flow
import React from "react";
import TileListHorizontal from "Components/TileListHorizontal/TileListHorizontal";
import { types } from "./TileListHorizontal.constants";
import { withGameProviderProps } from "./GameProviderProps";

type Props = {
  /** Type of list (e.g, game-providers) */
  type: string,
  title: string,
};

const TileListHorizontalContainer = (props: Props) => {
  if (props.type === types.GAME_PROVIDERS) {
    const GameProviderList = withGameProviderProps({
      Component: TileListHorizontal,
      props,
    });
    return <GameProviderList />;
  }
  return <TileListHorizontal {...props} />;
};

export default TileListHorizontalContainer;
