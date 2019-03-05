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

const TileListHorizontalContainer = ({
  type = types.GAME_PROVIDERS,
  title = "",
}: Props) => {
  if (type === types.GAME_PROVIDERS) {
    const GameProviderList = withGameProviderProps({
      Component: TileListHorizontal,
      props: { title },
    });
    return <GameProviderList />;
  }
  return <TileListHorizontal title={title} />;
};

export default TileListHorizontalContainer;
