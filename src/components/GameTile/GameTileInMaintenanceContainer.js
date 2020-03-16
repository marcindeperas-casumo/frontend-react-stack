// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GameTileInMaintenance } from "Components/GameTile/GameTileInMaintenance";
import * as A from "Types/apollo";
import { GameTileInMaintenanceCmsQuery } from "./GameTileInMaintenance.graphql";

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
  const { data, loading } = useQuery<A.GameTileInMaintenanceCmsQuery, _>(
    GameTileInMaintenanceCmsQuery
  );

  if (loading) {
    return null;
  }

  return (
    <GameTileInMaintenance
      temporaryUnavailableText={data?.temporaryUnavailableText}
      ratio={ratio}
      className={className}
      game={game}
      imgixOpts={imgixOpts}
    />
  );
};
