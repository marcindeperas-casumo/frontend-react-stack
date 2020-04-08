// @flow
import React from "react";
import { GameTileInMaintenance } from "Components/GameTile/GameTileInMaintenance";
import * as A from "Types/apollo";
import { useTranslationsGql } from "Utils/hooks/useTranslationGql";

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
  const { t } = useTranslationsGql({
    temporaryUnavailableText:
      "root:mobile.game-details:fields.temporarily_unavailable",
  });

  return (
    <GameTileInMaintenance
      temporaryUnavailableText={t.temporaryUnavailableText}
      ratio={ratio}
      className={className}
      game={game}
      imgixOpts={imgixOpts}
    />
  );
};
