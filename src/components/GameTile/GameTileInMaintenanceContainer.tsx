// @flow
import React from "react";
import { GameTileInMaintenance } from "Components/GameTile/GameTileInMaintenance";
import * as A from "Types/apollo";
import { useTranslations } from "Utils/hooks";

type Props = {
  ratio: string,
  game: A.GameTileInMaintenance_Game,
  className?: string,
  imgixOpts?: Object,
  temporaryUnavailableText?: string,
};

export const GameTileInMaintenanceContainer = ({
  ratio,
  className,
  game,
  imgixOpts,
}: Props) => {
  const t = useTranslations<{ temporarily_unavailable: string }>(
    "mobile.game-details"
  );

  if (!t) {
    return null;
  }

  return (
    <GameTileInMaintenance
      temporaryUnavailableText={t.temporarily_unavailable}
      ratio={ratio}
      className={className}
      game={game}
      imgixOpts={imgixOpts}
    />
  );
};
